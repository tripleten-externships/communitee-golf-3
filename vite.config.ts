import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  define: {
    // Inject EXT_MODE as an environment variable
    "process.env.EXT_MODE": JSON.stringify(process.env.VITE_EXT_MODE || "dev"),
  },
  build: {
    target: "esnext",
    outDir: "dist",
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
      host: "localhost",
    },
  },
});
