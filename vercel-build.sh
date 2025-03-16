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

# Fix path in index.html if needed
echo "Fixing paths in index.html..."
if grep -q "src=\"/src/main.tsx\"" client/index.html; then
  sed -i 's#src="/src/main.tsx"#src="./src/main.tsx"#g' client/index.html
fi

# Build frontend with Vite
echo "Building frontend..."
npx vite build

# Build server with esbuild
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

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

echo "Build completed successfully!"
echo "Output directories:"
ls -la dist/ || echo "dist directory not found"
ls -la dist/public/ || echo "dist/public directory not found"