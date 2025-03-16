#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable to indicate production build
export NODE_ENV=production

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Install necessary packages for the API
npm install express cors

# Build frontend with Vite
echo "Building frontend..."
cd client && npx vite build && cd ..

# Build server with esbuild
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Ensure the output directory exists
echo "Setting up output directories..."
mkdir -p dist/public

# Copy static assets to the public directory
echo "Copying static assets..."
cp -r client/dist/* dist/public/ 2>/dev/null || echo "No assets to copy from client/dist"

# Create a minimal package.json for the API
echo "Creating API configuration..."
cat > api/package.json << EOL
{
  "name": "api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "dependencies": {
    "express": "^4.21.2",
    "cors": "^2.8.5"
  }
}
EOL

# Make sure we don't overwrite the built index.html
echo "Checking for built index.html..."
if [ ! -f "dist/public/index.html" ]; then
  echo "Creating fallback index.html..."
  cat > dist/public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HempLaunch - Your Hemp Business Startup Partner</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL
else
  echo "Using existing built index.html"
fi

echo "Build completed successfully!"
echo "Output directories:"
ls -la dist/ || echo "dist directory not found"
ls -la dist/public/ 2>/dev/null || echo "dist/public directory not found"