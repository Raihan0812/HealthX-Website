# ✅ HealthX Deployment Checklist

## **PRE-DEPLOYMENT CHECKLIST**
- [ ] GitHub account created
- [ ] All HealthX files ready in /app folder
- [ ] Strong passwords prepared for all accounts
- [ ] Email access available for verifications

---

## **📂 GITHUB SETUP** 
- [ ] Repository created: "healthx-website"
- [ ] All files uploaded to repository
- [ ] Repository is public
- [ ] Files include: backend/, frontend/, README.md, etc.

---

## **💾 MONGODB ATLAS SETUP**
- [ ] Account created at cloud.mongodb.com
- [ ] Free M0 cluster created
- [ ] Database user created (username: healthx-admin)
- [ ] Password saved securely
- [ ] Network access set to 0.0.0.0/0 (allow all IPs)
- [ ] Connection string copied and saved
- [ ] Connection string format verified: mongodb+srv://username:password@cluster.mongodb.net/

---

## **🚂 RAILWAY BACKEND DEPLOYMENT**
- [ ] Account created at railway.app
- [ ] GitHub repository connected
- [ ] Project deployed automatically
- [ ] Environment variables added:
  - [ ] MONGO_URL (MongoDB connection string)
  - [ ] DB_NAME (healthx)
  - [ ] SECRET_KEY (healthx-secret-key-2024-production)
  - [ ] PORT (8001)
- [ ] Deployment successful (green checkmark)
- [ ] Backend URL copied: https://_______.up.railway.app
- [ ] API test successful: [railway-url]/api shows JSON response

---

## **🌐 VERCEL FRONTEND DEPLOYMENT**
- [ ] Account created at vercel.com
- [ ] GitHub repository imported
- [ ] Root directory set to "frontend"
- [ ] Environment variable added:
  - [ ] REACT_APP_BACKEND_URL (Railway URL from above)
- [ ] Build successful
- [ ] Deployment successful
- [ ] Frontend URL copied: https://_______.vercel.app
- [ ] Website loads correctly

---

## **🌍 CUSTOM DOMAIN SETUP** (Optional - $12/year)
- [ ] Domain purchased (e.g., healthx.org)
- [ ] Domain added to Vercel project
- [ ] DNS records configured:
  - [ ] CNAME: www → cname.vercel-dns.com
  - [ ] A: @ → 76.76.19.61
- [ ] DNS propagation complete (wait 24-48 hours)
- [ ] SSL certificate active
- [ ] Custom domain loads website

---

## **🧪 FUNCTIONALITY TESTING**

### **Homepage Testing**
- [ ] Main page loads with HealthX branding
- [ ] $2.8M funding information displays
- [ ] Industry partnerships section visible
- [ ] HealthX Card section shows
- [ ] Features section loads with images
- [ ] Navigation menu works
- [ ] Mobile responsive design works

### **User Authentication Testing**
- [ ] Registration page accessible
- [ ] New user can register with email
- [ ] Registration success message shows
- [ ] Login page accessible
- [ ] Registered user can login
- [ ] Login redirects to dashboard
- [ ] Logout functionality works

### **Presale Page Testing**
- [ ] Presale page loads correctly
- [ ] Cryptocurrency selection works (BTC, ETH, BNB)
- [ ] Payment addresses display correctly:
  - [ ] ETH/BNB: 0x6d17BBD5De076A5837A537caE1Ae49B07575427E
  - [ ] BTC: bc1qf3gq85j3fpd5wvqjmzyeqw2auvg2uelvwg9v24
- [ ] Token calculation updates correctly ($0.005 per token)
- [ ] Wallet connect button appears
- [ ] Purchase process works for logged-in users

### **User Dashboard Testing**
- [ ] Dashboard accessible after login
- [ ] User profile information displays
- [ ] Purchase statistics show correctly
- [ ] Purchase history table works
- [ ] Protected route security works (redirects if not logged in)

### **Admin Panel Testing**
- [ ] Admin URL accessible: [your-website]/admin-secret-dashboard
- [ ] Admin login works with credentials:
  - [ ] Username: Raihan081
  - [ ] Password: Chowdhury1
- [ ] Platform statistics display
- [ ] User count shows correctly
- [ ] Purchase analytics work
- [ ] Recent users list displays
- [ ] Recent purchases list displays

### **Mobile Testing**
- [ ] All pages load on mobile
- [ ] Navigation menu works on mobile
- [ ] Forms work on mobile devices
- [ ] Text is readable on small screens
- [ ] Buttons are clickable on mobile
- [ ] Images display correctly on mobile

### **Cross-Browser Testing**
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

---

## **📊 PERFORMANCE CHECKLIST**
- [ ] Homepage loads in under 3 seconds
- [ ] No JavaScript errors in browser console
- [ ] Images load properly
- [ ] API calls respond quickly
- [ ] Database operations work correctly
- [ ] HTTPS enabled (green lock in browser)

---

## **📝 DOCUMENTATION CHECKLIST**
- [ ] All URLs documented and saved
- [ ] All passwords saved securely
- [ ] Environment variables documented
- [ ] Admin credentials saved
- [ ] Payment addresses verified
- [ ] Deployment dates recorded

---

## **🎯 SUCCESS VERIFICATION**

### **Final Success Test:**
1. [ ] Open your website URL
2. [ ] Register a new user account
3. [ ] Login with the new account
4. [ ] Visit presale page and check crypto addresses
5. [ ] Access user dashboard
6. [ ] Test admin panel with provided credentials
7. [ ] Share website with a friend to test from different location

### **Ready for Launch When:**
- [ ] All checkboxes above are completed ✅
- [ ] Website accessible from multiple devices
- [ ] All features working correctly
- [ ] No critical errors in browser console
- [ ] Mobile version working properly

---

## **🚀 POST-DEPLOYMENT TASKS**
- [ ] Share website URL with users
- [ ] Monitor admin dashboard for new registrations
- [ ] Check payment addresses regularly
- [ ] Monitor Railway/Vercel usage limits
- [ ] Set up email notifications for new purchases (optional)

---

## **📞 EMERGENCY CONTACTS**
- Railway Support: https://railway.app/help
- Vercel Support: https://vercel.com/support  
- MongoDB Support: https://www.mongodb.com/support
- Domain Support: [Your registrar's support]

---

**🎉 CONGRATULATIONS!**
Once all items are checked, your HealthX website is live and ready for presale investments!

**Share your success:**
- Website URL: ________________
- Admin Panel: ________________/admin-secret-dashboard
- Launch Date: ________________