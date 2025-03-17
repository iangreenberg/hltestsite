#!/bin/bash

# Add all changes
git add .

# Commit changes with a fixed message
git commit -m "Fix vercel.json schema validation issues" --allow-empty

# Push to GitHub
git push origin main

echo "Changes pushed to GitHub!"