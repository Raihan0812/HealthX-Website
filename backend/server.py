from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
import uuid
import logging
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configuration
SECRET_KEY = "healthx-secret-key-2024"  # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="HealthX API", description="HealthX Blockchain Healthcare Platform API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class Purchase(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    crypto_type: str
    amount_crypto: float
    amount_usd: float
    tokens_purchased: float
    wallet_address: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PurchaseCreate(BaseModel):
    crypto_type: str
    amount_crypto: float
    amount_usd: float
    tokens_purchased: float
    wallet_address: str

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"id": user_id})
    if user is None:
        raise credentials_exception
    return User(**user)

# Authentication endpoints
@api_router.post("/auth/register", response_model=dict)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user
    user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        is_verified=True  # For now, auto-verify. In production, send email verification
    )
    
    # Store user in database
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_password
    await db.users.insert_one(user_dict)
    
    return {"message": "User registered successfully", "user_id": user.id}

@api_router.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin):
    # Find user by email
    user_data = await db.users.find_one({"email": user_credentials.email})
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(user_credentials.password, user_data["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Check if user is verified
    if not user_data.get("is_verified", False):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please verify your email before logging in"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data["id"]}, expires_delta=access_token_expires
    )
    
    user = User(**user_data)
    return Token(access_token=access_token, token_type="bearer", user=user)

@api_router.get("/user/profile", response_model=User)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

# Presale endpoints
@api_router.post("/presale/purchase", response_model=Purchase)
async def create_purchase(purchase_data: PurchaseCreate, current_user: User = Depends(get_current_user)):
    # Create purchase record
    purchase = Purchase(
        user_id=current_user.id,
        crypto_type=purchase_data.crypto_type,
        amount_crypto=purchase_data.amount_crypto,
        amount_usd=purchase_data.amount_usd,
        tokens_purchased=purchase_data.tokens_purchased,
        wallet_address=purchase_data.wallet_address
    )
    
    # Store in database
    await db.purchases.insert_one(purchase.dict())
    
    return purchase

@api_router.get("/presale/purchases")
async def get_user_purchases(current_user: User = Depends(get_current_user)):
    # Get user's purchases
    purchases_cursor = db.purchases.find({"user_id": current_user.id}).sort("created_at", -1)
    purchases = await purchases_cursor.to_list(1000)
    
    # Calculate stats
    total_tokens = sum(p.get("tokens_purchased", 0) for p in purchases)
    total_invested = sum(p.get("amount_usd", 0) for p in purchases)
    
    stats = {
        "totalTokens": total_tokens,
        "totalInvested": total_invested,
        "purchaseCount": len(purchases)
    }
    
    return {
        "purchases": [Purchase(**p) for p in purchases],
        "stats": stats
    }

# Admin endpoints
@api_router.get("/admin/dashboard")
async def get_admin_dashboard():
    # Get platform stats
    total_users = await db.users.count_documents({})
    total_purchases = await db.purchases.count_documents({})
    
    # Calculate total funds and tokens
    purchases_cursor = db.purchases.find({})
    all_purchases = await purchases_cursor.to_list(10000)
    total_funds = sum(p.get("amount_usd", 0) for p in all_purchases)
    total_tokens = sum(p.get("tokens_purchased", 0) for p in all_purchases)
    
    # Get recent users
    recent_users_cursor = db.users.find({}).sort("created_at", -1).limit(10)
    recent_users = await recent_users_cursor.to_list(10)
    
    # Get recent purchases with user info
    recent_purchases_cursor = db.purchases.find({}).sort("created_at", -1).limit(20)
    recent_purchases = await recent_purchases_cursor.to_list(20)
    
    # Add user email to purchases and convert ObjectId to string
    processed_purchases = []
    for purchase in recent_purchases:
        # Convert MongoDB ObjectId to string if present
        if "_id" in purchase:
            purchase["_id"] = str(purchase["_id"])
        
        user = await db.users.find_one({"id": purchase["user_id"]})
        if user and "_id" in user:
            user["_id"] = str(user["_id"])
            
        purchase["user_email"] = user["email"] if user else "Unknown"
        processed_purchases.append(purchase)
    
    # Process user objects to ensure they're serializable
    processed_users = []
    for user in recent_users:
        if "_id" in user:
            user["_id"] = str(user["_id"])
        processed_users.append(user)
    
    return {
        "totalUsers": total_users,
        "totalPurchases": total_purchases,
        "totalFunds": total_funds,
        "totalTokens": total_tokens,
        "recentUsers": [User(**user) for user in processed_users],
        "recentPurchases": processed_purchases
    }

# General endpoints
@api_router.get("/")
async def root():
    return {"message": "HealthX API is running", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)