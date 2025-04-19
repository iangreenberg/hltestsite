#!/bin/bash

# Set GitHub credentials
git config --global user.name "Replit Deployment"
git config --global user.email "deployment@replit.com"

# Add all changes
git add .

# Commit changes
git commit -m "Update landing page with new design and hemp-products background" || true

# Set the GitHub token from environment variable
GITHUB_TOKEN_VALUE=$(printenv GITHUB_TOKEN)

# Set the remote with the token
git remote set-url origin "https://${GITHUB_TOKEN_VALUE}@github.com/iangreenberg/hltestsite.git"

# Push to GitHub
git push origin main

echo "Push completed"