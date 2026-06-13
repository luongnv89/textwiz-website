import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Set `VITE_BASE_PATH=/textwiz-website/` in CI for GitHub Pages project sites. */
const base = process.env.VITE_BASE_PATH ?? '/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-saga'],
        },
      },
    },
  },
});
