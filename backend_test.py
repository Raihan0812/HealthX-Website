import requests
import json
import time
import uuid
import random
from datetime import datetime

# Configuration
BASE_URL = "https://2a165062-b68e-4df1-ae06-5fc268dffbdd.preview.emergentagent.com/api"
TEST_EMAIL = f"test_{uuid.uuid4()}@example.com"
TEST_PASSWORD = "Test@123456"
TEST_FULL_NAME = "Test User"
access_token = None

# Test results tracking
test_results = {
    "total_tests": 0,
    "passed_tests": 0,
    "failed_tests": 0,
    "tests": []
}

def log_test(name, success, details=None):
    """Log test results"""
    global test_results
    test_results["total_tests"] += 1
    if success:
        test_results["passed_tests"] += 1
        status = "PASSED"
    else:
        test_results["failed_tests"] += 1
        status = "FAILED"
    
    test_results["tests"].append({
        "name": name,
        "status": status,
        "details": details
    })
    
    print(f"[{status}] {name}")
    if details:
        print(f"  Details: {details}")

def test_root_endpoint():
    """Test the root endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/")
        success = response.status_code == 200 and "message" in response.json()
        log_test("Root Endpoint", success, response.json())
        return success
    except Exception as e:
        log_test("Root Endpoint", False, str(e))
        return False

def test_health_endpoint():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        success = response.status_code == 200 and "status" in response.json()
        log_test("Health Check Endpoint", success, response.json())
        return success
    except Exception as e:
        log_test("Health Check Endpoint", False, str(e))
        return False

def test_register_valid():
    """Test user registration with valid data"""
    try:
        data = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD,
            "full_name": TEST_FULL_NAME
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        success = response.status_code == 200 and "user_id" in response.json()
        log_test("User Registration (Valid)", success, response.json())
        return success
    except Exception as e:
        log_test("User Registration (Valid)", False, str(e))
        return False

def test_register_duplicate():
    """Test user registration with duplicate email"""
    try:
        data = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD,
            "full_name": TEST_FULL_NAME
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        success = response.status_code == 400 and "detail" in response.json()
        log_test("User Registration (Duplicate)", success, response.json())
        return success
    except Exception as e:
        log_test("User Registration (Duplicate)", False, str(e))
        return False

def test_register_invalid_email():
    """Test user registration with invalid email"""
    try:
        data = {
            "email": "invalid-email",
            "password": TEST_PASSWORD,
            "full_name": TEST_FULL_NAME
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        success = response.status_code == 422  # Validation error
        log_test("User Registration (Invalid Email)", success, 
                 response.json() if success else response.text)
        return success
    except Exception as e:
        log_test("User Registration (Invalid Email)", False, str(e))
        return False

def test_login_valid():
    """Test login with valid credentials"""
    global access_token
    try:
        data = {
            "email": TEST_EMAIL,
            "password": TEST_PASSWORD
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=data)
        success = response.status_code == 200 and "access_token" in response.json()
        if success:
            access_token = response.json()["access_token"]
        log_test("User Login (Valid)", success, 
                 {"token_received": success, "user": response.json().get("user", {})} if success else response.json())
        return success
    except Exception as e:
        log_test("User Login (Valid)", False, str(e))
        return False

def test_login_invalid():
    """Test login with invalid credentials"""
    try:
        data = {
            "email": TEST_EMAIL,
            "password": "WrongPassword123"
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=data)
        success = response.status_code == 401
        log_test("User Login (Invalid)", success, response.json())
        return success
    except Exception as e:
        log_test("User Login (Invalid)", False, str(e))
        return False

def test_profile_with_token():
    """Test accessing profile with valid token"""
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(f"{BASE_URL}/user/profile", headers=headers)
        success = response.status_code == 200 and "email" in response.json()
        log_test("User Profile (With Token)", success, response.json())
        return success
    except Exception as e:
        log_test("User Profile (With Token)", False, str(e))
        return False

def test_profile_without_token():
    """Test accessing profile without token"""
    try:
        response = requests.get(f"{BASE_URL}/user/profile")
        success = response.status_code == 403 or response.status_code == 401
        log_test("User Profile (Without Token)", success, response.json() if success else response.text)
        return success
    except Exception as e:
        log_test("User Profile (Without Token)", False, str(e))
        return False

def test_presale_purchase():
    """Test creating a presale purchase"""
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        data = {
            "crypto_type": "ETH",
            "amount_crypto": 1.5,
            "amount_usd": 3000,
            "tokens_purchased": 30000,
            "wallet_address": "0x" + "".join(random.choice("0123456789abcdef") for _ in range(40))
        }
        response = requests.post(f"{BASE_URL}/presale/purchase", json=data, headers=headers)
        success = response.status_code == 200 and "id" in response.json()
        log_test("Presale Purchase", success, response.json())
        return success
    except Exception as e:
        log_test("Presale Purchase", False, str(e))
        return False

def test_presale_purchase_without_auth():
    """Test creating a presale purchase without authentication"""
    try:
        data = {
            "crypto_type": "ETH",
            "amount_crypto": 1.5,
            "amount_usd": 3000,
            "tokens_purchased": 30000,
            "wallet_address": "0x" + "".join(random.choice("0123456789abcdef") for _ in range(40))
        }
        response = requests.post(f"{BASE_URL}/presale/purchase", json=data)
        success = response.status_code == 403 or response.status_code == 401
        log_test("Presale Purchase (Without Auth)", success, response.json() if success else response.text)
        return success
    except Exception as e:
        log_test("Presale Purchase (Without Auth)", False, str(e))
        return False

def test_presale_purchases():
    """Test getting user's presale purchases"""
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(f"{BASE_URL}/presale/purchases", headers=headers)
        success = response.status_code == 200 and "purchases" in response.json() and "stats" in response.json()
        log_test("Presale Purchases", success, response.json())
        return success
    except Exception as e:
        log_test("Presale Purchases", False, str(e))
        return False

def test_admin_dashboard():
    """Test admin dashboard endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/admin/dashboard")
        success = response.status_code == 200 and "totalUsers" in response.json()
        log_test("Admin Dashboard", success, response.json())
        return success
    except Exception as e:
        log_test("Admin Dashboard", False, str(e))
        return False

def run_all_tests():
    """Run all tests in sequence"""
    print("\n===== STARTING BACKEND API TESTS =====\n")
    
    # Test general endpoints
    test_root_endpoint()
    test_health_endpoint()
    
    # Test authentication
    test_register_valid()
    test_register_duplicate()
    test_register_invalid_email()
    test_login_valid()
    test_login_invalid()
    test_profile_with_token()
    test_profile_without_token()
    
    # Test presale endpoints
    test_presale_purchase()
    test_presale_purchase_without_auth()
    test_presale_purchases()
    
    # Test admin dashboard
    test_admin_dashboard()
    
    # Print summary
    print("\n===== TEST SUMMARY =====")
    print(f"Total Tests: {test_results['total_tests']}")
    print(f"Passed: {test_results['passed_tests']}")
    print(f"Failed: {test_results['failed_tests']}")
    print(f"Success Rate: {(test_results['passed_tests'] / test_results['total_tests']) * 100:.2f}%")
    
    return test_results

if __name__ == "__main__":
    run_all_tests()