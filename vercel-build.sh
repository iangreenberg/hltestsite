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
npm install
# Also install specific Vite dependencies in the client directory
npm install vite @vitejs/plugin-react
# Create a proper tsconfig paths configuration
echo "Setting up proper path aliases for build..."
if [ -f "tsconfig.json" ]; then
  cp tsconfig.json tsconfig.json.bak
else 
  echo '{"compilerOptions":{}}' > tsconfig.json.bak
fi
echo '{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}' > tsconfig.json
# Run the build
npm run build
# Restore original tsconfig if it existed
mv tsconfig.json.bak tsconfig.json
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