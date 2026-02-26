import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: process.env.BUILD_SSR ? 'dist-ssr' : 'docs',
  },
  ssr: {
    // Bundle react-helmet-async so its CJS→ESM interop is handled by Vite,
    // not by Node.js (which rejects named imports from CJS modules).
    noExternal: ['react-helmet-async'],
  },
})
