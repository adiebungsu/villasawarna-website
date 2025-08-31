import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      overlay: true,
      // Optimize HMR for faster updates
      timeout: 30000
    },
    // Optimize for faster development
    watch: {
      usePolling: false,
      interval: 200,
      // Ignore certain files to reduce watching overhead
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    },
    // Reduce memory usage
    fs: {
      strict: false,
      allow: ['..']
    },
    // Optimize middleware
    middlewareMode: false
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'sitemap.xml'],
      manifest: {
        name: 'Villa Sawarna',
        short_name: 'Villa Sawarna',
        description: 'Sewa Villa & Homestay di Pantai Sawarna',
        theme_color: '#0ea5e9',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/, /\.(xml)$/],
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-navigation-menu',
      'react-router-dom'
    ],
    exclude: ['@vitejs/plugin-react'],
    // Force pre-bundling for faster startup
    force: false
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-navigation-menu'],
          maps: ['leaflet', 'react-leaflet'],
          forms: ['react-hook-form', 'zod', '@hookform/resolvers'],
          editor: ['@tiptap/react', '@tiptap/starter-kit'],
        },
        // Prevent source maps from being generated in production
        sourcemap: false,
        // Add comments to prevent Google from crawling JS files
        banner: '/* Villa Sawarna - Do not crawl this file */',
        footer: '/* End Villa Sawarna */'
      }
    },
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    // Disable source maps in production
    sourcemap: false
  },
  publicDir: 'public'
});
