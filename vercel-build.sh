#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Copy shared schema to client for local builds
echo "Copying shared schema to client..."
mkdir -p client/shared
cp -r shared/* client/shared/

# We're no longer copying the tailwind config as it's now directly in the client directory

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

echo "Build completed successfully!"