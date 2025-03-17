#!/bin/bash
set -e

echo "Starting custom Vercel build process..."

# Copy shared schema to client for local builds
echo "Copying shared schema to client..."
mkdir -p client/shared
cp -r shared/* client/shared/

# Create a temporary package.json without problematic dependencies
echo "Creating clean package.json for client..."
cat > client/package.json << 'EOF'
{
  "name": "client",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "vite build",
    "vercel-build": "vite build"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-query": "^5.28.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "esbuild": "^0.18.20",
    "lucide-react": "^0.363.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-hook-form": "^7.51.0",
    "react-icons": "^5.0.1",
    "tailwind-merge": "^2.2.2",
    "tailwindcss-animate": "^1.0.7",
    "terser": "^5.29.2",
    "wouter": "^3.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.65",
    "@types/react-dom": "^18.2.22",
    "@types/react-helmet": "^6.1.11",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.4.2",
    "vite": "^5.1.6"
  }
}
EOF

# Create tailwind config with minimal plugins
echo "Creating optimized tailwind config..."
mkdir -p client/src/lib
cat > client/src/lib/tailwind-plugin.cjs << 'EOF'
// tailwind-plugin.cjs
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, addBase, theme }) {
  const newUtilities = {
    '.font-sans': {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    '.border-border': {
      borderColor: 'hsl(var(--border))',
    },
    '.bg-background': {
      backgroundColor: 'hsl(var(--background))',
    },
    '.text-foreground': {
      color: 'hsl(var(--foreground))',
    },
    '.text-primary': {
      color: 'hsl(var(--primary))',
    },
    '.text-secondary': {
      color: 'hsl(var(--secondary))',
    },
    '.bg-primary': {
      backgroundColor: 'hsl(var(--primary))',
    },
    '.bg-secondary': {
      backgroundColor: 'hsl(var(--secondary))',
    }
  }
  addUtilities(newUtilities);
  
  // Add base styles
  addBase({
    '*': {
      borderColor: 'hsl(var(--border))',
    },
    'body': {
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      fontFeatureSettings: '"rlig" 1, "calt" 1'
    }
  });
});
EOF

# Create tailwind config - CommonJS version for compatibility
cat > client/tailwind.config.cjs << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('./src/lib/tailwind-plugin.cjs')
  ],
};
EOF

# ESM version
cat > client/tailwind.config.js << 'EOF'
// ES Module version
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('./src/lib/tailwind-plugin.cjs')
  ],
};
EOF

# PostCSS config - CommonJS version for compatibility
cat > client/postcss.config.cjs << 'EOF'
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
EOF

# ESM version
cat > client/postcss.config.js << 'EOF'
export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
EOF

# Build client
echo "Current directory: $(pwd)"
ls -la

# Navigate to client directory
cd client
echo "Entering client directory: $(pwd)"

# Create dist directory if it doesn't exist
mkdir -p dist

# Install dependencies
npm install --production=false

# Set NODE_ENV to production for optimized build
export NODE_ENV=production
npm run build
cd ..

echo "Build completed successfully!"