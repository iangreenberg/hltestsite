#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Make sure shared directory exists in both locations for maximum compatibility
mkdir -p client/shared
cp -r shared/* client/shared/

# Also copy to src/shared for imports that use that path
mkdir -p client/src/shared
cp -r shared/* client/src/shared/

# Tailwind config is now created with proper ES module syntax below

# Create a complete tailwind config file with plugins for ES modules
cat > client/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F5D50", // Forest Green
        secondary: "#C8A951", // Gold
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};
EOF

# Create a postcss config file for Vercel
cat > client/postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Build client
cd client
npm install --production=false
# Install build dependencies that might be missing
npm install terser esbuild @esbuild/linux-x64 --no-save
# Install specific dependencies that might be missing in Vercel environment
# Use a specific version of tailwindcss that is compatible with the setup
npm install tailwindcss@3.3.0 postcss autoprefixer @tailwindcss/typography --no-save
# Install UI and icon dependencies that might be missing in Vercel
npm install lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge --no-save
# Install shadcn UI component dependencies
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip tailwindcss-animate --no-save
# Install additional dependencies
npm install react-hook-form @hookform/resolvers zod --no-save
# Set NODE_ENV to production for optimized build
export NODE_ENV=production
npm run build
cd ..

echo "Build completed successfully!"