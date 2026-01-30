import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/csf/',
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 100,
      },
      png: {
        quality: 100,
      },
      webp: {
        lossless: true,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
});
