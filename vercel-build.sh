#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable
export NODE_ENV=production

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Verify build output
if [ -d "client/dist" ]; then
  echo "Build completed successfully! Output directory:"
  ls -la client/dist
else
  echo "Error: Build directory not found"
  exit 1
fi