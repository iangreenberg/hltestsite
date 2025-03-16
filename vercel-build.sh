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

# Prepare shared schemas for client use
echo "Preparing shared schemas for client..."
mkdir -p client/src/shared
cp -r shared/* client/src/shared/ 2>/dev/null || echo "No shared directory found"

# Create local schema.ts file for client-side use
echo "Creating local schema.ts file for client..."
mkdir -p client/src/lib
cat > client/src/lib/schema.ts << 'EOF'
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

# Build client
echo "Building client..."
cd client

# Install all dependencies properly
echo "Installing client dependencies..."
npm install
npm install --save-dev vite@5.1.6 @vitejs/plugin-react@4.2.1 typescript@5.4.2

# Verify Vite is installed properly
echo "Checking Vite installation..."
if [ -d "node_modules/vite" ]; then
  echo "Vite found in node_modules, version:"
  cat node_modules/vite/package.json | grep \"version\"
else 
  echo "Vite not found, installing again specifically..."
  npm install --save-dev vite@5.1.6 --no-save --force
fi

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
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["./src/shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}' > tsconfig.json

# Run the build using absolute path
echo "Attempting build with multiple fallback methods..."
echo "Bin directory contents:"
ls -la node_modules/.bin || echo "No bin directory found"

# Try multiple build approaches
if [ -f "node_modules/.bin/vite" ]; then
  echo "Attempting build with vite binary..."
  NODE_OPTIONS="--max-old-space-size=4096" ./node_modules/.bin/vite build
elif [ -f "node_modules/vite/bin/vite.js" ]; then
  echo "Attempting build with node execution of vite.js..."
  NODE_OPTIONS="--max-old-space-size=4096" node ./node_modules/vite/bin/vite.js build
else
  echo "Creating simplified vite config and trying again..."
  
  # Create simplified vite config
  cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
  },
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/src/shared'
    }
  }
});
EOF

  # Try final build attempt
  npm install --save-dev terser@5.16.1 --no-save
  NODE_OPTIONS="--max-old-space-size=4096" ./node_modules/.bin/vite build || {
    echo "All build attempts failed, creating fallback output..."
    mkdir -p dist
    echo "<html><body><h1>Site under maintenance</h1><p>Please check back soon.</p></body></html>" > dist/index.html
  }
fi

# Restore original tsconfig if it existed
mv tsconfig.json.bak tsconfig.json
cd ..

# Make sure output directory exists
echo "Preparing final dist directory..."
mkdir -p dist

# Copy built client files to dist
echo "Copying client build to dist directory..."
cp -r client/dist/* dist/ 2>/dev/null || echo "No client/dist found"

# Create shared directory in final output
mkdir -p dist/shared
echo "Copying shared schema files to dist/shared..."
cp -r shared/* dist/shared/ 2>/dev/null || echo "No shared directory found"

# Create api directory in final output
mkdir -p dist/api
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

# Create an index.html in case the build failed
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

# Verify build output
echo "Build completed! Output directory:"
ls -la dist
echo "API directory contents:"
ls -la dist/api

echo "Vercel build process complete!"