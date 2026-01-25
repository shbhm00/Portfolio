import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite Configuration
 *
 * WHY we use these settings:
 * - @vitejs/plugin-react: Enables React Fast Refresh for instant feedback during development
 * - Path aliases: Cleaner imports, avoid deep relative paths like ../../../components
 * - Build optimizations: Code splitting happens automatically with dynamic imports
 */
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  // Change '/portfolio/' to your repo name if different, or '/' for custom domain
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',
  resolve: {
    // Path aliases for cleaner imports throughout the application
    // Instead of: import { Button } from '../../../components/ui/Button'
    // We can use: import { Button } from '@/components/ui/Button'
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  // Build configuration for production optimization
  build: {
    // Target modern browsers for smaller bundle size
    target: 'esnext',
    // Enable source maps for debugging in production
    sourcemap: true,
    // Rollup-specific options for code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk: React and related libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Animation library in separate chunk (loaded only when needed)
          animations: ['framer-motion'],
        },
      },
    },
  },
});
