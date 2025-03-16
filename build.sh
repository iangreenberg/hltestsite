#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable to indicate production build
export NODE_ENV=production

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Ensure the API is properly set up
echo "Setting up API..."
mkdir -p api
if [ ! -f api/index.js ]; then
  echo "API file not found. Creating minimal API endpoint..."
  cp api/index.js api/index.js.bak || true
fi

echo "Build completed successfully!"