# HealthX - Blockchain Healthcare Platform

A complete cryptocurrency presale website for HealthX with multi-crypto payments, user authentication, and admin dashboard.

## 🌟 Features

- **Sleek Black Design**: Professional dark theme with blue/cyan accents
- **Multi-Crypto Payments**: Support for Bitcoin (BTC), Ethereum (ETH), and Binance Coin (BNB)
- **User Authentication**: Email-based registration and JWT login system
- **Presale Functionality**: Token purchase system with $0.005 per HX token
- **User Dashboard**: Purchase tracking and transaction history
- **Admin Panel**: Hidden dashboard for platform analytics
- **Responsive Design**: Mobile-friendly across all devices
- **Wallet Integration**: MetaMask and Web3 wallet support

## 🚀 Live Demo

- **Frontend**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/healthx-website)
- **Backend**: [Deploy to Railway](https://railway.app/new/template)

## 📱 Payment Addresses

- **ETH/BNB**: `0x6d17BBD5De076A5837A537caE1Ae49B07575427E`
- **BTC**: `bc1qf3gq85j3fpd5wvqjmzyeqw2auvg2uelvwg9v24`

## 🔐 Admin Access

- **URL**: `/admin-secret-dashboard`
- **Username**: `Raihan081`
- **Password**: `Chowdhury1`

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Web3.js
- **Backend**: FastAPI, MongoDB, JWT Authentication
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## 📦 Quick Deploy

### 1. Database Setup (MongoDB Atlas)
```bash
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string
```

### 2. Backend Deployment (Railway)
```bash
1. Go to https://railway.app/
2. Connect GitHub repository
3. Railway auto-detects FastAPI
4. Add environment variables:
   - MONGO_URL: mongodb+srv://[username]:[password]@cluster.mongodb.net/healthx
   - DB_NAME: healthx
5. Deploy and copy the URL
```

### 3. Frontend Deployment (Vercel)
```bash
1. Go to https://vercel.com/
2. Import GitHub repository
3. Set root directory to: "frontend"
4. Add environment variable:
   - REACT_APP_BACKEND_URL: [YOUR_RAILWAY_URL]
5. Deploy
```

## 💻 Local Development

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.template .env
# Edit .env with your MongoDB connection
python server.py
```

### Frontend Setup
```bash
cd frontend
yarn install
# Edit .env with backend URL
yarn start
```

## 🧪 Testing

All features have been thoroughly tested:
- ✅ User authentication flow
- ✅ Presale functionality
- ✅ Wallet integration
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ API endpoints
- ✅ Database operations

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/healthx
DB_NAME=healthx
PORT=8001
SECRET_KEY=healthx-secret-key-2024
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-railway-backend-url
```

## 🎯 Project Structure

```
healthx-website/
├── backend/                 # FastAPI backend
│   ├── server.py           # Main API server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styling
│   ├── package.json       # Node dependencies
│   └── .env              # Frontend environment
├── Procfile              # Railway deployment
├── railway.json          # Railway configuration
├── vercel.json           # Vercel configuration
└── deploy.sh             # Deployment guide
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (protected)

### Presale
- `POST /api/presale/purchase` - Record token purchase (protected)
- `GET /api/presale/purchases` - Get user purchases (protected)

### Admin
- `GET /api/admin/dashboard` - Platform analytics

## 🔒 Security Features

- JWT token authentication
- bcrypt password hashing
- CORS protection
- Input validation
- Protected routes
- Environment variable security

## 📞 Support

For deployment assistance or technical support, please refer to:
- Railway Documentation: https://docs.railway.app/
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/

## 📄 License

MIT License - Built for HealthX Blockchain Healthcare Platform