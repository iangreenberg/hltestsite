#!/bin/bash

# Add all changes
git add .

# Commit changes with a message
echo "Enter commit message:"
read commit_message

git commit -m "$commit_message"

# Push to GitHub
git push origin main

echo "Changes pushed to GitHub!"
echo "Your landing page should be available at your-domain.com/fb-landing after deployment completes."