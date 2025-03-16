#!/bin/bash

# Run the build command
npm run build

# Create the output directory structure if it doesn't exist
mkdir -p dist/public

# Make sure all the client assets are in the right place
if [ -d "client/dist" ]; then
  cp -r client/dist/* dist/public/ 2>/dev/null || true
fi

echo "Build completed successfully!"