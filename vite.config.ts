import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir:'dist'
  },
  define: {
    'process.env': process.env, // Ensures Vercel environment variables are considered
  },
})
