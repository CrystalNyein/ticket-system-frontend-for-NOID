import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: {
      key: fs.readFileSync('./certs/Nyeins-MacBook-Pro.local-key.pem'),
      cert: fs.readFileSync('./certs/Nyeins-MacBook-Pro.local.pem'),
    },
    proxy: {
      '/api': {
        target: 'https://Nyeins-MacBook-Pro.local:8080',
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
      },
    },
  },
  plugins: [react()],
});
