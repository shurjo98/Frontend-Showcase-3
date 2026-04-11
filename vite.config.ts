import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Frontend-Showcase-3/",
  plugins: [react(), tailwindcss()],
});