import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Try to fix permission issues
      target: 'es2020',
    },
  },
  build: {
    // Use a different approach if esbuild fails
    minify: 'esbuild',
    target: 'es2020',
  },
  esbuild: {
    // Additional esbuild options
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
