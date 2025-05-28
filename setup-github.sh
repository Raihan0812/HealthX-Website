#!/bin/bash

echo "🚀 HealthX GitHub Repository Setup"
echo "=================================="
echo ""

echo "Run these commands to create a GitHub repository:"
echo ""
echo "1. Initialize Git repository:"
echo "   git init"
echo "   git add ."
echo "   git commit -m \"Initial HealthX website with presale functionality\""
echo ""

echo "2. Create GitHub repository:"
echo "   • Go to https://github.com/new"
echo "   • Repository name: healthx-website"
echo "   • Description: HealthX Blockchain Healthcare Platform"
echo "   • Public repository"
echo "   • Don't initialize with README (we already have one)"
echo ""

echo "3. Push to GitHub:"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/healthx-website.git"
echo "   git push -u origin main"
echo ""

echo "4. Then proceed with deployment:"
echo "   • Railway: https://railway.app/ (for backend)"
echo "   • Vercel: https://vercel.com/ (for frontend)"
echo "   • MongoDB Atlas: https://cloud.mongodb.com/ (for database)"
echo ""

echo "📋 FILES READY FOR DEPLOYMENT:"
ls -la | grep -E '\.(json|sh|md|py|js|css|txt)$'
echo ""

echo "✅ All deployment files are configured and ready!"
echo "   Follow the deploy.sh guide for step-by-step instructions."