import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sitemapPlugin } from "./scripts/generate-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), mode === "production" && sitemapPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate animation library
          'framer': ['framer-motion'],
          // Isolate UI primitives (shared across pages)
          'radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-toast',
          ],
          // Vendor chunk for React ecosystem
          'vendor': ['react', 'react-dom', 'react-router-dom', 'zustand', '@tanstack/react-query'],
        },
      },
    },
  },
}));
