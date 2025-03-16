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

# Build client
echo "Building client..."
cd client
# Install all dependencies including dev dependencies needed for build
npm install
# Explicitly install build dependencies with exact versions to ensure consistency
npm install --save-dev vite@5.1.6 @vitejs/plugin-react@4.2.1
npm install --save @hookform/resolvers@3.3.4 zod@3.22.4 react-hook-form@7.51.0 @tanstack/react-query@5.28.4 wouter@3.0.0
# Verify critical build dependencies are installed
if [ ! -d "node_modules/vite" ]; then
  echo "Vite not found, installing directly..."
  npm install --save-dev vite@5.1.6
fi
# Create shared directory in client for build
echo "Copying shared directory to client for build..."
mkdir -p shared
cp -r ../shared/* shared/ || echo "No shared directory at parent level"

# Create explicit schema file in client src directory as fallback
echo "Creating explicit schema copy in client src directory..."
mkdir -p src/shared
cp -r ../shared/* src/shared/ || echo "No shared directory at parent level"

# Make sure our local schema file is present and used
echo "Ensuring local schema.ts file is present..."
mkdir -p src/lib
if [ ! -f "src/lib/schema.ts" ]; then
  echo "Creating local schema.ts file..."
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
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}' > tsconfig.json
# Run the build using npx to ensure we use the locally installed vite
echo "Node modules bin directory contents:"
ls -la node_modules/.bin || echo "node_modules/.bin directory not found"

# Try alternative build approaches in case one fails
echo "Attempting build with local npx vite..."
if [ -f "node_modules/.bin/vite" ]; then
  node_modules/.bin/vite build
elif [ -f "node_modules/vite/bin/vite.js" ]; then
  echo "Attempting direct node execution of vite..."
  node node_modules/vite/bin/vite.js build
else
  echo "Falling back to package.json build script..."
  npm run build || echo "npm run build failed, falling back to direct install and build"
  # Last resort: reinstall and try again
  npm install vite@5.1.6 @vitejs/plugin-react@4.2.1 --no-save
  npx vite build
fi
# Restore original tsconfig if it existed
mv tsconfig.json.bak tsconfig.json
cd ..

# Make sure output directory exists
echo "Preparing dist directory..."
mkdir -p dist

# Create shared directory in client for build
echo "Copying shared directory to client for build..."
mkdir -p client/shared
cp -r shared/* client/shared/

# Create explicit schema file in client src directory as fallback
echo "Creating explicit schema copy in client src directory..."
mkdir -p client/src/shared
cp -r shared/* client/src/shared/

# Make sure our local schema file is present and used
echo "Ensuring local schema.ts file is present..."
mkdir -p client/src/lib
if [ ! -f "client/src/lib/schema.ts" ]; then
  echo "Creating local schema.ts file..."
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
fi

# Copy built client files to dist
echo "Copying client build to dist directory..."
cp -r client/dist/* dist/

# Create shared directory in final output
mkdir -p dist/shared

# Copy shared schema files
echo "Copying shared schema files to dist/shared..."
cp -r shared/* dist/shared/

# Create api directory in final output
mkdir -p dist/api

# Copy API files to the API directory
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

# Verify build output
if [ -d "dist" ]; then
  echo "Build completed successfully! Output directory:"
  ls -la dist
  echo "API directory contents:"
  ls -la dist/api
else
  echo "Error: Build directory not found"
  exit 1
fi

echo "Vercel build process complete!"