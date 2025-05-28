# 🚀 HealthX Website - Complete Deployment Guide
## Step-by-Step Instructions with Screenshots Simulation

---

## 📋 **OVERVIEW**
You will deploy:
- **Database**: MongoDB Atlas (Free)
- **Backend**: Railway.app (Free)
- **Frontend**: Vercel (Free)
- **Custom Domain**: www.healthx.org (Optional, $12/year)

**Total Time**: 30-45 minutes
**Total Cost**: Free (or $12/year for custom domain)

---

## 🗂️ **STEP 1: PREPARE YOUR GITHUB REPOSITORY**

### 1.1 Create GitHub Account (if needed)
```
1. Go to: https://github.com/
2. Click "Sign up" (top right)
3. Use email: [your-email]
4. Create password: [strong-password]
5. Verify email when prompted
```

### 1.2 Create Repository
```
1. Once logged in, click the "+" icon (top right)
2. Select "New repository"
3. Repository name: healthx-website
4. Description: HealthX Blockchain Healthcare Platform
5. Select "Public" 
6. ❌ DO NOT check "Add a README file" (we have one)
7. ❌ DO NOT add .gitignore (we have one)
8. ❌ DO NOT choose a license (we have one)
9. Click "Create repository"
```

### 1.3 Upload Your Code
```
OPTION A: Using GitHub Web Interface (Easier)
1. You'll see "uploading an existing file" link
2. Click "uploading an existing file"
3. Drag and drop ALL files from your /app folder
4. Commit message: "Initial HealthX website upload"
5. Click "Commit changes"

OPTION B: Using Command Line (If you have Git)
1. Open terminal/command prompt
2. Navigate to your /app folder
3. Run these commands:
   git init
   git add .
   git commit -m "Initial HealthX website upload"
   git branch -M main
   git remote add origin https://github.com/[YOUR-USERNAME]/healthx-website.git
   git push -u origin main
```

---

## 💾 **STEP 2: SETUP MONGODB ATLAS DATABASE**

### 2.1 Create MongoDB Atlas Account
```
1. Go to: https://cloud.mongodb.com/
2. Click "Try Free" (green button)
3. Sign up options:
   - Use Google account (recommended - faster)
   - OR create with email/password
4. Complete profile setup:
   - Goal: "Learn MongoDB"
   - Experience: "I'm new to MongoDB"
   - Click "Finish"
```

### 2.2 Create Free Cluster
```
1. You'll see "Create a deployment" screen
2. Select "M0" (FREE tier) - should be pre-selected
3. Cloud Provider: AWS (default is fine)
4. Region: Choose closest to your location
5. Cluster Name: "healthx-cluster" (or keep default)
6. Click "Create Deployment" (green button)
7. ⏳ Wait 3-5 minutes for cluster creation
```

### 2.3 Create Database User
```
1. You'll see "Security Quickstart"
2. Username: healthx-admin
3. Password: Generate secure password OR create your own
   ⚠️ IMPORTANT: Copy this password - you'll need it!
4. Click "Create User"
```

### 2.4 Setup Network Access
```
1. Click "Add IP Address"
2. Click "Add Current IP Address"
3. Click "Add IP Address" again
4. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   ⚠️ This is needed for Railway to connect
5. Click "Add Entry"
6. Click "Finish and Close"
```

### 2.5 Get Connection String
```
1. Click "Go to Database"
2. Click "Connect" button (next to your cluster)
3. Select "Drivers"
4. Choose "Python" and version "3.12 or later"
5. Copy the connection string - looks like:
   mongodb+srv://healthx-admin:<password>@healthx-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
6. Replace <password> with your actual password
7. Save this - you'll need it for Railway!
```

---

## 🚂 **STEP 3: DEPLOY BACKEND TO RAILWAY**

### 3.1 Create Railway Account
```
1. Go to: https://railway.app/
2. Click "Login" (top right)
3. Choose "Login with GitHub"
4. Authorize Railway to access your GitHub
5. Complete profile setup if prompted
```

### 3.2 Create New Project
```
1. Click "New Project" (purple button)
2. Select "Deploy from GitHub repo"
3. Select your "healthx-website" repository
4. Click "Deploy Now"
5. ⏳ Railway will automatically detect it's a Python project
6. Wait for initial deployment (may take 5-10 minutes)
```

### 3.3 Configure Environment Variables
```
1. Click on your project (if not already selected)
2. Click on the service (should show "healthx-website")
3. Go to "Variables" tab
4. Click "New Variable" and add EACH of these:

   Variable 1:
   Name: MONGO_URL
   Value: [paste your MongoDB connection string from Step 2.5]
   
   Variable 2:
   Name: DB_NAME
   Value: healthx
   
   Variable 3:
   Name: SECRET_KEY
   Value: healthx-secret-key-2024-production
   
   Variable 4:
   Name: PORT
   Value: 8001

5. Click "Add" for each variable
```

### 3.4 Redeploy with Variables
```
1. Go to "Deployments" tab
2. Click "Redeploy" (or wait for automatic redeploy)
3. Wait for deployment to complete (green checkmark)
4. Click on your service
5. Copy the "Public Domain" URL (looks like: https://healthx-website-production-xxxx.up.railway.app)
6. ⚠️ SAVE THIS URL - you need it for Vercel!
```

### 3.5 Test Backend
```
1. Open your Railway URL in browser
2. Add /api to the end: https://your-railway-url.up.railway.app/api
3. You should see: {"message": "HealthX API is running", "version": "1.0.0"}
4. ✅ If you see this, backend is working!
```

---

## 🌐 **STEP 4: DEPLOY FRONTEND TO VERCEL**

### 4.1 Create Vercel Account
```
1. Go to: https://vercel.com/
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories
```

### 4.2 Import Project
```
1. Click "New Project" (or "Add New..." → "Project")
2. Find your "healthx-website" repository
3. Click "Import" next to it
4. ⚠️ IMPORTANT: Click "Edit" next to "Root Directory"
5. Select "frontend" folder
6. Click "Continue"
```

### 4.3 Configure Build Settings
```
1. Framework Preset: "Create React App" (should auto-detect)
2. Root Directory: frontend (should be set from step 4.2)
3. Build Command: yarn build (default is fine)
4. Output Directory: build (default is fine)
5. Install Command: yarn install (default is fine)
```

### 4.4 Add Environment Variables
```
1. Open "Environment Variables" section
2. Add this variable:
   Name: REACT_APP_BACKEND_URL
   Value: [your Railway URL from Step 3.4]
   ⚠️ DO NOT add /api to the end - just the base URL!
3. Click "Add"
```

### 4.5 Deploy
```
1. Click "Deploy" (blue button)
2. ⏳ Wait 3-5 minutes for build and deployment
3. You'll see "🎉 Your project has been successfully deployed"
4. Click "Visit" to see your live website!
```

---

## 🌍 **STEP 5: SETUP CUSTOM DOMAIN (OPTIONAL)**

### 5.1 Buy Domain
```
1. Go to: https://namecheap.com/ or https://godaddy.com/
2. Search for: healthx.org (or similar)
3. If available ($10-15/year), purchase it
4. Complete domain registration
```

### 5.2 Configure Domain in Vercel
```
1. In your Vercel project, click "Settings"
2. Click "Domains" in sidebar
3. Click "Add" 
4. Enter: www.healthx.org
5. Click "Add"
6. You'll see DNS configuration instructions
```

### 5.3 Update DNS Records
```
1. Go to your domain registrar (Namecheap/GoDaddy)
2. Find "DNS Management" or "DNS Settings"
3. Add these records:
   
   Record 1:
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Record 2:
   Type: A
   Name: @
   Value: 76.76.19.61
   
4. Save changes
5. ⏳ Wait 24-48 hours for DNS propagation
```

---

## ✅ **STEP 6: TESTING YOUR WEBSITE**

### 6.1 Test All Features
```
1. Open your Vercel URL (or custom domain)
2. Test Navigation:
   ✅ Home page loads with HealthX content
   ✅ Presale page accessible
   ✅ Login/Register pages work
   
3. Test Registration:
   ✅ Create new account with email
   ✅ Login with created account
   ✅ Access dashboard after login
   
4. Test Presale:
   ✅ Crypto selection works
   ✅ Token calculation updates
   ✅ Payment addresses display
   
5. Test Admin Panel:
   ✅ Go to: [your-url]/admin-secret-dashboard
   ✅ Login with: Raihan081 / Chowdhury1
   ✅ View platform analytics
```

### 6.2 Test on Mobile
```
1. Open website on mobile device
2. Check all pages are responsive
3. Test registration/login on mobile
4. Verify presale page works on mobile
```

---

## 🚨 **TROUBLESHOOTING GUIDE**

### MongoDB Issues
```
❌ "MongoServerError: Authentication failed"
✅ Solution: Check MongoDB username/password in Railway variables

❌ "Connection timeout"
✅ Solution: Ensure 0.0.0.0/0 is whitelisted in MongoDB Network Access

❌ "Database connection failed"
✅ Solution: Verify MONGO_URL format in Railway variables
```

### Railway Issues
```
❌ "Application failed to start"
✅ Solution: Check Railway logs for Python errors

❌ "Module not found"
✅ Solution: Ensure requirements.txt is in backend/ folder

❌ "PORT already in use"
✅ Solution: Verify PORT=8001 in Railway variables
```

### Vercel Issues
```
❌ "Build failed"
✅ Solution: Ensure root directory is set to "frontend"

❌ "API calls failing"
✅ Solution: Check REACT_APP_BACKEND_URL points to Railway URL

❌ "404 on page refresh"
✅ Solution: Vercel should handle this automatically for React apps
```

### Custom Domain Issues
```
❌ "Domain not pointing to site"
✅ Solution: Wait 24-48 hours for DNS propagation

❌ "SSL certificate error"
✅ Solution: Vercel automatically provides SSL - wait a few hours

❌ "www not working"
✅ Solution: Ensure CNAME record points to cname.vercel-dns.com
```

---

## 📞 **SUPPORT CONTACTS**

### If You Get Stuck:
```
Railway Support: https://railway.app/help
Vercel Support: https://vercel.com/support
MongoDB Support: https://www.mongodb.com/support

GitHub Issues: https://github.com/[your-username]/healthx-website/issues
```

### Quick Help Commands:
```
Railway Logs: Go to project → Deployments → View Logs
Vercel Logs: Go to project → Functions → View Function Logs
MongoDB Logs: Go to Atlas → Database → Browse Collections
```

---

## 🎉 **SUCCESS CHECKLIST**

When everything is working, you should have:
- ✅ Live website at your Vercel URL (or custom domain)
- ✅ Backend API responding at Railway URL
- ✅ Database storing user registrations
- ✅ Presale page with crypto addresses
- ✅ Admin panel accessible
- ✅ Mobile-responsive design
- ✅ All payments recorded in admin dashboard

---

**🚀 Congratulations! Your HealthX website is now live!**

Share your website URL with users and start collecting presale investments!