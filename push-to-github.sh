#!/bin/bash

# Configure Git
git config --global user.name "Replit Deployment"
git config --global user.email "deployment@replit.com"

# Use token for authentication
git remote set-url origin https://${GITHUB_TOKEN}@github.com/iangreenberg/hltestsite.git

# Add all changes
git add .

# Commit changes
git commit -m "Update Vercel configuration for deployment"

# Push to main branch
git push origin main