#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable
export NODE_ENV=production

# Ensure API dependencies are installed
echo "Installing API dependencies..."
cd api
npm install
cd ..

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Copy necessary files to ensure proper deployment
echo "Preparing dist directory..."
mkdir -p client/dist/api
cp -r api/* client/dist/api/

# Verify build output
if [ -d "client/dist" ]; then
  echo "Build completed successfully! Output directory:"
  ls -la client/dist
  echo "API directory contents:"
  ls -la client/dist/api
else
  echo "Error: Build directory not found"
  exit 1
fi