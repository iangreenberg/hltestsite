import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@shared', replacement: path.resolve(__dirname, '..', 'shared') },
      // Fallback alias for local build
      { find: /^@shared\/(.*)$/, replacement: path.resolve(__dirname, 'shared', '$1') }
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: ['console.debug']
      }
    },
    rollupOptions: {
      // Make sure to bundle all dependencies
      external: []
    }
  },
  optimizeDeps: {
    include: ['zod', 'react-hook-form', '@hookform/resolvers/zod', '@tanstack/react-query', 'wouter']
  }
});