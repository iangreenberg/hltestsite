#!/bin/bash

# Configure Git
git config --global user.name "Replit Deployment"
git config --global user.email "deployment@replit.com"

# Make sure we're on main branch
git checkout main

# Use token for authentication
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/iangreenberg/hltestsite.git"

# Add all changes
git add .

# Commit changes (even if there are no changes)
git commit -m "Update Vercel configuration for deployment" || true

# Pull any remote changes first
git pull origin main --no-rebase

# Push to main branch
git push origin main