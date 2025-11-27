import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   base: '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
   // Development server configuration
  server: {
    proxy: {
      '/api': {
        target: 'https://taskios.duckdns.org',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
});
