# 🚨 HealthX Deployment Troubleshooting Guide

## Quick Diagnosis

### 🔍 **STEP-BY-STEP ISSUE IDENTIFICATION**

#### Issue: "Website won't load"
```
1. Check Vercel deployment status
   → Go to Vercel Dashboard → Your Project → Deployments
   → Look for green checkmark ✅ or red X ❌

2. If Vercel shows success but site won't load:
   → Check custom domain DNS settings
   → Wait 24-48 hours for DNS propagation
   → Try accessing via Vercel's default URL first

3. If Vercel deployment failed:
   → Check build logs for errors
   → Verify root directory is set to "frontend"
   → Ensure all required files are in GitHub repository
```

#### Issue: "Login/Registration not working"
```
1. Open browser developer tools (F12)
2. Go to Network tab
3. Try to register/login
4. Look for failed API calls (red entries)
5. If API calls are failing:
   → Check REACT_APP_BACKEND_URL in Vercel
   → Verify Railway backend is running
   → Test Railway URL directly: [railway-url]/api
```

#### Issue: "Backend API not responding"
```
1. Test Railway URL directly:
   → Open: https://your-railway-url.up.railway.app/api
   → Should see: {"message": "HealthX API is running"}

2. If not working:
   → Go to Railway → Your Project → Deployments
   → Check deployment logs for errors
   → Verify environment variables are set correctly

3. Common Railway issues:
   → Missing requirements.txt in backend folder
   → Incorrect MONGO_URL format
   → Python import errors in logs
```

#### Issue: "Database connection failed"
```
1. Check MongoDB Atlas cluster status:
   → Go to Atlas dashboard
   → Ensure cluster is active (green indicator)

2. Verify connection string:
   → Format: mongodb+srv://username:password@cluster.mongodb.net/
   → Username and password must match Atlas settings
   → No < > brackets around password

3. Check network access:
   → Atlas → Network Access → IP Access List
   → Must include 0.0.0.0/0 for Railway access
```

---

## 🆘 **COMMON ERROR MESSAGES & SOLUTIONS**

### MongoDB Errors
```
Error: "Authentication failed"
Solution: 
- Double-check username/password in MONGO_URL
- Ensure database user exists in Atlas
- Verify password doesn't contain special characters that need encoding

Error: "Network timeout"
Solution:
- Add 0.0.0.0/0 to MongoDB Network Access whitelist
- Check if MongoDB cluster is in "Paused" state
- Wait a few minutes after cluster creation
```

### Railway Errors
```
Error: "Application failed to start"
Solution:
- Check Railway logs: Project → Deployments → View Logs
- Verify requirements.txt exists in backend/ folder
- Ensure Python version compatibility

Error: "Port already in use"
Solution:
- Set PORT=8001 in Railway environment variables
- Restart Railway deployment
- Check server.py uses os.environ.get("PORT", 8001)

Error: "Module not found"
Solution:
- Verify all imports in server.py
- Check requirements.txt has all dependencies
- Ensure file structure matches expectations
```

### Vercel Errors
```
Error: "Build failed"
Solution:
- Check Vercel build logs
- Ensure root directory set to "frontend"
- Verify package.json exists in frontend folder
- Check for React compilation errors

Error: "API calls return 404"
Solution:
- Verify REACT_APP_BACKEND_URL in Vercel environment variables
- Ensure Railway URL is correct and accessible
- Check that Railway backend has /api prefix in routes

Error: "Page refreshes show 404"
Solution:
- This is usually auto-handled by Vercel for React apps
- If persists, check vercel.json configuration
- Ensure rewrites are properly configured
```

---

## 🔧 **STEP-BY-STEP FIXES**

### Fix 1: Reset MongoDB Connection
```
1. Go to MongoDB Atlas → Database Access
2. Edit your database user
3. Reset password → Generate new password
4. Copy new password
5. Update MONGO_URL in Railway with new password
6. Redeploy Railway service
```

### Fix 2: Reset Railway Deployment
```
1. Go to Railway → Your Project
2. Click on service
3. Go to Settings tab
4. Click "Redeploy" 
5. Or delete and recreate service if needed
6. Re-add all environment variables
```

### Fix 3: Reset Vercel Deployment
```
1. Go to Vercel → Your Project → Settings
2. Go to Environment Variables
3. Verify REACT_APP_BACKEND_URL is correct
4. Go to Deployments tab
5. Click "Redeploy" on latest deployment
```

### Fix 4: Reset DNS for Custom Domain
```
1. Go to your domain registrar
2. Delete existing DNS records
3. Re-add required records:
   - CNAME: www → cname.vercel-dns.com
   - A: @ → 76.76.19.61
4. Wait 24-48 hours for propagation
```

---

## 📞 **WHEN TO CONTACT SUPPORT**

### Contact Railway Support if:
- Deployment keeps failing after multiple attempts
- Server logs show internal Railway errors
- Billing or account issues

### Contact Vercel Support if:
- Build consistently fails with unclear errors
- Custom domain won't connect after 48 hours
- SSL certificate issues persist

### Contact MongoDB Support if:
- Cluster won't start or stays paused
- Connection issues persist after verification
- Data corruption or access problems

---

## 🧪 **TESTING YOUR FIXES**

### After Each Fix, Test:
```
1. Backend Health Check:
   → Visit: [railway-url]/api
   → Should return: {"message": "HealthX API is running"}

2. Frontend Load Test:
   → Visit your Vercel URL
   → All pages should load without errors

3. Full Integration Test:
   → Register new user account
   → Login with new account
   → Access dashboard
   → Visit admin panel
   → Test presale page

4. Mobile Test:
   → Test on mobile device or browser dev tools
   → All features should work on mobile
```

---

## 📊 **SUCCESS INDICATORS**

### Your deployment is successful when:
- ✅ Vercel URL loads HealthX homepage
- ✅ User registration creates account
- ✅ Login redirects to dashboard
- ✅ Admin panel accessible with credentials
- ✅ Presale page shows crypto addresses
- ✅ Mobile version works properly
- ✅ No console errors in browser dev tools

### Performance Checks:
- 📱 Mobile responsive: Test on different screen sizes
- ⚡ Load speed: Pages load within 3 seconds
- 🔒 Security: HTTPS enabled on custom domain
- 🌐 Global access: Test from different locations/devices

---

**💡 Pro Tip: Keep a deployment log with URLs, passwords, and timestamps for future reference!**