#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Make sure shared directory exists in both locations for maximum compatibility
mkdir -p client/shared
cp -r shared/* client/shared/

# Also copy to src/shared for imports that use that path
mkdir -p client/src/shared
cp -r shared/* client/src/shared/

# Using dual .cjs and .js approach to ensure compatibility regardless of package.json type

# Create both CommonJS and ES Module versions of the configs
# Use .cjs for CommonJS which will be used regardless of package.json type setting

# CommonJS version of tailwind config (will take precedence)
cat > client/tailwind.config.cjs << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
};
EOF

# CommonJS version of postcss config (will take precedence) - now using @tailwindcss/postcss
cat > client/postcss.config.cjs << 'EOF'
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
EOF

# Also create the ES module versions as fallbacks - now using @tailwindcss/postcss
cat > client/tailwind.config.js << 'EOF'
// ES Module version
/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
EOF

cat > client/postcss.config.js << 'EOF'
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
EOF

# Build client
cd client
npm install --production=false
# Install the specific @tailwindcss/postcss package mentioned in the error message
npm install @tailwindcss/postcss --save-dev
# Install TailwindCSS v3.3.3 and related packages which are known to be compatible
npm install tailwindcss@3.3.3 postcss@8.4.31 autoprefixer@10.4.15 @tailwindcss/typography@0.5.10 tailwindcss-animate@1.0.7 --save-dev
# Install build dependencies that might be missing
npm install terser esbuild @esbuild/linux-x64 --no-save
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