import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Workspace packages are aliased to SOURCE rather than built output.
 * Vite transpiles them directly, so there is no build step between
 * packages/* and apps/web during development.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@garage/ui': fileURLToPath(new URL('../../packages/ui/src', import.meta.url)),
      '@garage/shared': fileURLToPath(new URL('../../packages/shared/src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Route-level code splitting is handled by React.lazy; this keeps the
        // heavy vendor libraries out of the entry chunk. 02_NAVIGATION.md §19
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
        },
      },
    },
  },
})
