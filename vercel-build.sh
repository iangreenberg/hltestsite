#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set environment variable to indicate production build
export NODE_ENV=production

# Install dependencies in the root directory
echo "Installing root dependencies..."
npm install

# Install necessary packages for the API
npm install express cors

# Change to client directory and install any client-specific dependencies
echo "Building client..."
cd client

# Fix path in index.html if needed
echo "Fixing paths in index.html..."
if grep -q "src=\"/src/main.tsx\"" index.html; then
  sed -i 's#src="/src/main.tsx"#src="./src/main.tsx"#g' index.html
fi

# Build frontend with Vite
echo "Building frontend with Vite..."
npx vite build

# Return to root directory
cd ..

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
ls -la client/dist/ || echo "client/dist directory not found"