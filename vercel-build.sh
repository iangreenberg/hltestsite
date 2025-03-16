#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable for production
export NODE_ENV=production

# Install root dependencies if needed
echo "Checking root dependencies..."
if [ -f "package.json" ]; then
  echo "Installing root dependencies..."
  npm install --omit=dev
fi

# Ensure API dependencies are installed
echo "Installing API dependencies..."
cd api
npm install --omit=dev
cd ..

# Build client
echo "Building client..."
cd client
# Install all dependencies including dev dependencies needed for build
npm install --include=dev
# Make sure vite is installed globally for the build process
npm install -g vite
# Run the build
npm run build
cd ..

# Make sure output directory exists
echo "Preparing dist directory..."
mkdir -p dist

# Copy built client files to dist
echo "Copying client build to dist directory..."
cp -r client/dist/* dist/

# Create api directory in final output
mkdir -p dist/api

# Copy API files to the API directory
echo "Copying API files to dist/api..."
cp -r api/* dist/api/

# Ensure vercel.json is in the root
if [ -f "vercel.json" ]; then
  echo "Copying vercel.json to dist..."
  cp vercel.json dist/
fi

# Ensure .vercelignore is in the root
if [ -f ".vercelignore" ]; then
  echo "Copying .vercelignore to dist..."
  cp .vercelignore dist/
fi

# Verify build output
if [ -d "dist" ]; then
  echo "Build completed successfully! Output directory:"
  ls -la dist
  echo "API directory contents:"
  ls -la dist/api
else
  echo "Error: Build directory not found"
  exit 1
fi

echo "Vercel build process complete!"