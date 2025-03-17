#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Make sure shared directory exists for client
mkdir -p client/shared
cp -r shared/* client/shared/

# Build client
cd client
npm install --production=false
npm run build
cd ..

echo "Build completed successfully!"