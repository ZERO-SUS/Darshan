import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages base path.
  //  - User site   (https://<user>.github.io)            -> '/'
  //  - Project site (https://<user>.github.io/<repo>/)   -> '/<repo>/'
  // If you deploy to a project repo, change this ONE value AND set
  // `pathSegmentsToKeep = 1` in public/404.html (see the comment there).
  // Deploying to project repo ZERO-SUS/Darshan -> served at /Darshan/.
  base: '/Darshan/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy vendors so the initial route loads faster.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
          markdown: ['react-markdown', 'remark-gfm'],
          fx: ['gsap', 'ogl'],
        },
      },
    },
  },
})
