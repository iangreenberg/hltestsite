#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable to indicate production build
export NODE_ENV=production

# Install dependencies (in case they're not already installed)
echo "Installing dependencies..."
npm install

# Build the client and server
echo "Building the application..."
npm run build

# Ensure the output directory exists
echo "Setting up output directories..."
mkdir -p dist/public

# Handle static assets - this is crucial for Vercel
if [ -d "dist/public" ]; then
  echo "Moving client assets to the correct location..."
  
  # For Vite builds, ensure the assets get to the right place
  if [ -d "client/dist" ] && [ "$(ls -A client/dist)" ]; then
    echo "Copying assets from client/dist to dist/public..."
    cp -r client/dist/* dist/public/ 2>/dev/null || true
  fi
  
  # Sometimes Vite outputs directly to dist/client
  if [ -d "dist/client" ] && [ "$(ls -A dist/client)" ]; then
    echo "Copying assets from dist/client to dist/public..."
    cp -r dist/client/* dist/public/ 2>/dev/null || true
  fi
fi

# Create a minimal package.json for the serverless function
echo "Creating serverless function configuration..."
cat > api/package.json << EOL
{
  "name": "api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module"
}
EOL

echo "Build completed successfully!"
echo "Output directories:"
ls -la dist/
ls -la dist/public/ 2>/dev/null || echo "dist/public is empty"