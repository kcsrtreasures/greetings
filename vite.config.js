import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/greetings/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: '/index.html'
    }
  }
})
