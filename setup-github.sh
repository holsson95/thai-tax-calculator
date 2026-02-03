#!/bin/bash

# Thai Tax Calculator - GitHub Setup Script
# This script will help you initialize git and push to GitHub

echo "🇹🇭 Thai Tax Calculator - GitHub Setup"
echo "======================================"
echo ""

# Initialize git repository
echo "📦 Initializing Git repository..."
git init

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: React + Vite + TypeScript + Tailwind starter"

echo ""
echo "✅ Local repository initialized!"
echo ""
echo "📌 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Name it: thai-tax-calculator"
echo "   - Do NOT initialize with README, .gitignore, or license"
echo ""
echo "2. Connect to your GitHub repository:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/thai-tax-calculator.git"
echo ""
echo "3. Push your code:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🎉 That's it! Your project will be on GitHub!"
