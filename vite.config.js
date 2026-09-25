import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true
  }
});
