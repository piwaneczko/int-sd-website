import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(process.cwd(), 'src/prerender.jsx'),
      // Not linked from nav/footer, so link-crawling from "/" won't find them.
      // /privacy/mint is intentionally unlinked (Google Play Console only)
      // but still needs a static file at that path since the site is served
      // as plain static files with no SPA fallback.
      additionalPrerenderRoutes: ['/portfolio', '/privacy/mint'],
    }),
  ],
  // Prerendering emits nested static files (e.g. dist/mint/changelog/index.html),
  // whose relative asset URLs would resolve incorrectly one level too deep —
  // the site is always served from the domain root, so an absolute base works
  // correctly at every route depth.
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})
