import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    open: true,
    proxy: {
      '/api': 'http://localhost:3001',
      secure: false,
    },
  },
});