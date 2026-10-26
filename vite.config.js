import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-p5': ['p5', 'p5.brush'],
          'vendor-animation': ['gsap', 'lenis'],
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
