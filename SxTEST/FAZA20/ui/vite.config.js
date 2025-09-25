import { defineConfig } from "vite";
export default defineConfig({
  server: {
    port: 5178,
    proxy: { "/api": "http://localhost:3006" }
  },
  build: { sourcemap: true },
  optimizeDeps: { esbuildOptions: { sourcemap: true } }
});
