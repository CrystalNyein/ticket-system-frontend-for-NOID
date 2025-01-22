import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
    },
    proxy: {
      "/api": {
        target: "https://DESKTOP-CAQ0N38.local:8080",
        changeOrigin: true,
        secure: false, // Accept self-signed certificates
      },
    },
  },
  plugins: [react()],
});
