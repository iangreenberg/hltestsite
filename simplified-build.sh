#!/bin/bash
set -e

echo "Starting simplified Vercel build process..."

# Make sure shared directory exists in both locations for maximum compatibility
mkdir -p client/shared
cp -r shared/* client/shared/

# Also copy to src/shared for imports that use that path
mkdir -p client/src/shared
cp -r shared/* client/src/shared/

# Create base CSS file with Tailwind directives
cat > client/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 150 27% 27%;  /* Forest Green */
    --primary-foreground: 0 0% 98%;
    --secondary: 44 46% 55%; /* Gold */
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 150 27% 27%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 150 27% 27%;
    --primary-foreground: 0 0% 98%;
    --secondary: 44 46% 55%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 150 27% 27%;
  }
}

/* We'll handle the base styles in the plugin instead of using @apply */
EOF

# Using dual .cjs and .js approach to ensure compatibility regardless of package.json type

# Create both CommonJS and ES Module versions of the configs
# Use .cjs for CommonJS which will be used regardless of package.json type setting

# CommonJS version of tailwind config (will take precedence)
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
    require("tailwindcss-animate"),
    require("./src/lib/tailwind-plugin.cjs")
  ],
};
EOF

# Create a helper plugin for font utilities
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
    // Add more ShadCN utility classes
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

# CommonJS version of postcss config (will take precedence)
cat > client/postcss.config.cjs << 'EOF'
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
EOF

# Also create the ES module versions as fallbacks
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

# Before installing dependencies, create a temporary package.json without problematic dependencies
echo "Creating clean package.json for client to avoid problematic dependencies..."
cp package.json package.json.bak

# Update package.json to remove problematic dependencies
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Remove problematic dependencies
  if (pkg.dependencies && pkg.dependencies['@tailwindcss/typography']) {
    delete pkg.dependencies['@tailwindcss/typography'];
  }
  
  if (pkg.devDependencies && pkg.devDependencies['@tailwindcss/typography']) {
    delete pkg.devDependencies['@tailwindcss/typography'];
  }
  
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Install dependencies with cleaned package.json
npm install --production=false

# Set NODE_ENV to production for optimized build
export NODE_ENV=production
npm run build

# Restore original package.json
mv package.json.bak package.json

cd ..

echo "Build completed successfully!"