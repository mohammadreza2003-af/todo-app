import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with `/api`
      "/api": {
        target: "http://127.0.0.1:5000", // The backend server to proxy to
        changeOrigin: true, // Changes the `Host` header to match the target server
      },
    },
  },
});