// vite.config.js

import { defineConfig } from "vite/dist/node/index.mjs";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Make sure the target matches your backend server port
        changeOrigin: true,
        // Remove the rewrite function
      },
    },
  },
});
