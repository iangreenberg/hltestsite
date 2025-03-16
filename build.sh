#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

echo "Build completed successfully!"