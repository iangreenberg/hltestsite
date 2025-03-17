#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Create directory structure
mkdir -p dist
rm -rf dist/*
mkdir -p dist/api

# Build client application
cd client
npm install
npm run build
cd ..

# Copy built client files to dist
cp -r client/dist/* dist/

# Set up API
cd api
npm install --omit=dev
cd ..
cp -r api/* dist/api/

# Create a very simple index.html fallback as last resort
if [ ! -f "dist/index.html" ]; then
  cat > dist/index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemp Launch</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    div { max-width: 600px; padding: 2rem; text-align: center; }
  </style>
</head>
<body>
  <div>
    <h1>Hemp Launch</h1>
    <p>Our full site is coming soon. Please check back later.</p>
  </div>
</body>
</html>
EOL
fi

echo "Build complete"