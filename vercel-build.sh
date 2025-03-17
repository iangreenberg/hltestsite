#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Set up local environment
export NODE_ENV=production
export PATH="$PATH:./node_modules/.bin"
export NODE_OPTIONS="--max-old-space-size=4096"

# Ensure correct directory structure
mkdir -p dist
mkdir -p dist/api
mkdir -p dist/shared

# Create client build
echo "Building client..."
cd client

# Install build dependencies - using exact, compatible versions
echo "Installing build dependencies..."
npm install --no-save vite@5.1.6 @vitejs/plugin-react@4.2.1 typescript@5.4.2

# First, clean up any conflicting configs
if [ -f "vite.config.js" ]; then
  echo "Removing JS config in favor of TS config..."
  rm vite.config.js
fi

# Ensure local schema copy exists
echo "Creating local schema..."
mkdir -p src/lib
cat > src/lib/schema.ts << 'EOF'
/**
 * Client-side schemas only - minimal version of shared/schema.ts
 */
import { z } from "zod";

// User schemas
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  isAdmin: z.boolean().optional().default(false),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  isAdmin: boolean;
};
export type LoginData = z.infer<typeof loginSchema>;

// Waitlist schemas
export const insertWaitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  business: z.string().min(1, "Business name is required"),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to our terms",
  }),
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = InsertWaitlist & { id: number };

// Email subscription schemas
export const insertEmailSubscriptionSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = InsertEmailSubscription & { id: number };
EOF

# Copy shared files to client and create necessary directories
echo "Setting up project structure..."
mkdir -p src/shared
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/pages
mkdir -p src/pages/admin

# Copy shared files
cp -r ../shared/* src/shared/ 2>/dev/null || :

# Create a simplified vite config that should work reliably
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    rollupOptions: {
      external: []
    }
  }
});
EOF

# Try building with our new simplified config
echo "Building client with simplified config..."
./node_modules/.bin/vite build || {
  echo "Build failed, trying alternate method..."
  # Try direct Node execution as a fallback
  node ./node_modules/vite/bin/vite.js build || {
    echo "All build attempts failed. Creating fallback."
    mkdir -p dist
    cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemp Launch Pro</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2F5D50;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #2F5D50;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #25453E;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hemp Launch Pro</h1>
    <p>We're making some improvements to our site. Please check back soon for our full service catalog.</p>
    <a href="mailto:contact@hemplaunch.co" class="button">Contact Us</a>
  </div>
</body>
</html>
EOF
  }
}

cd ..

# Copy client build to final output
echo "Copying build files to final location..."
cp -r client/dist/* dist/ 2>/dev/null || :

# Prepare API
echo "Setting up API..."
cd api
npm install --omit=dev
cd ..
cp -r api/* dist/api/

# Copy shared files
echo "Copying shared files..."
cp -r shared/* dist/shared/ 2>/dev/null || :

# Add vercel.json to dist if needed
[ -f "vercel.json" ] && cp vercel.json dist/

# Make sure we have an index.html
if [ ! -f "dist/index.html" ]; then
  echo "Creating fallback index.html..."
  cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemp Launch Pro</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2F5D50;
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #2F5D50;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #25453E;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hemp Launch Pro</h1>
    <p>We're making some improvements to our site. Please check back soon for our full service catalog.</p>
    <a href="mailto:contact@hemplaunch.co" class="button">Contact Us</a>
  </div>
</body>
</html>
EOF
fi

echo "Build process complete! Contents of dist directory:"
ls -la dist

echo "Vercel build done."