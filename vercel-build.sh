#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable to indicate production build
export NODE_ENV=production

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Build with the npm script (uses vite and esbuild)
echo "Building application..."
npm run build

# Ensure the output directory exists
echo "Setting up output directories..."
mkdir -p dist/public

# Create a minimal package.json for the API
echo "Creating API configuration..."
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
ls -la dist/ || echo "dist directory not found"
ls -la dist/public/ 2>/dev/null || echo "dist/public directory not found"