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
# Install build dependencies that might be missing
npm install terser esbuild @esbuild/linux-x64 --no-save
# Install specific dependencies that might be missing in Vercel environment
# Use a specific version of tailwindcss that is compatible with the setup
npm install tailwindcss@3.3.0 postcss autoprefixer @tailwindcss/typography --no-save
# Set NODE_ENV to production for optimized build
export NODE_ENV=production
npm run build
cd ..

echo "Build completed successfully!"