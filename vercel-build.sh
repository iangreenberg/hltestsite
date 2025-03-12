#!/bin/bash
# Install all dependencies
npm install

# Build the project
npm run build

# Make sure client/dist exists
mkdir -p client/dist

# Our vite.config.ts builds to dist/public, copy it to client/dist for Vercel
if [ -d "dist/public" ]; then
  cp -R dist/public/* client/dist/
fi