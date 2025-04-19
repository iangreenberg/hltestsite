#!/bin/bash

# This script will help push changes to GitHub
# Usage: bash push-script.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN

if [ $# -ne 2 ]; then
  echo "Usage: bash push-script.sh YOUR_GITHUB_USERNAME YOUR_PERSONAL_ACCESS_TOKEN"
  exit 1
fi

USERNAME=$1
TOKEN=$2

# Set remote URL with authentication
git remote set-url origin https://${USERNAME}:${TOKEN}@github.com/iangreenberg/hltestsite.git

# Check if we need to pull first
git fetch
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
  echo "Remote has changes that you don't have locally. Pulling first..."
  git pull origin main
fi

# Commit any changes
if [ -n "$(git status --porcelain)" ]; then
  echo "You have uncommitted changes. Committing them..."
  git add .
  git commit -m "Updates from Replit"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

# Reset the remote URL to remove credentials
git remote set-url origin https://github.com/iangreenberg/hltestsite.git

echo "Push complete!"