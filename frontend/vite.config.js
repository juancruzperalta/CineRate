import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
    tailwindcss(),
    react(),
  ],
      headers: {
      'Content-Security-Policy': "frame-ancestors 'self' https://www.youtube.com"
    }
})
