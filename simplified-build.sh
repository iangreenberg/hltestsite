#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Make sure shared directory exists in both locations for maximum compatibility
mkdir -p client/shared
cp -r shared/* client/shared/

# Also copy to src/shared for imports that use that path
mkdir -p client/src/shared
cp -r shared/* client/src/shared/

# Build client
cd client
npm install --production=false
# Install terser explicitly as it's needed for Vite build
npm install terser --no-save
npm run build
cd ..

echo "Build completed successfully!"