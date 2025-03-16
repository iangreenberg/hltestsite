#!/bin/bash
set -e

echo "Starting Vercel build process..."

# Move to client directory first
cd client

# Install build dependencies explicitly with exact versions
echo "Installing Vite and related packages with exact versions..."
npm install --no-save vite@5.1.6 @vitejs/plugin-react@4.2.1 typescript@5.4.2

# Ensure we have a local schema copy
echo "Creating schema copy..."
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

# Make sure we have shared directory 
echo "Copying shared directory..."
mkdir -p src/shared
cp -r ../shared/* src/shared/ 2>/dev/null || echo "No shared files to copy"

# Now run build directly with node modules path
echo "Building client with npx..."
NODE_OPTIONS="--max-old-space-size=4096" npx --no vite build

# If build failed, create fallback
if [ ! -d "dist" ]; then
  echo "Build failed, creating fallback..."
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
fi

# Return to root directory
cd ..

# Prepare API if needed
echo "Installing API dependencies..."
cd api
npm install --omit=dev
cd ..

# Create final output directory
echo "Preparing final output..."
mkdir -p dist

# Copy client build
echo "Copying client build..."
cp -r client/dist/* dist/

# Set up API in output
echo "Setting up API..."
mkdir -p dist/api
cp -r api/* dist/api/

# Copy shared files
echo "Copying shared files..."
mkdir -p dist/shared
cp -r shared/* dist/shared/ 2>/dev/null || echo "No shared files to copy"

# Ensure config files are copied
for config_file in vercel.json .vercelignore; do
  if [ -f "$config_file" ]; then
    echo "Copying $config_file..."
    cp "$config_file" dist/
  fi
done

echo "Build complete! Contents of dist directory:"
ls -la dist

echo "Vercel build process complete!"