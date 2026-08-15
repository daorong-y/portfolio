import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use the explicit project path so assets resolve reliably on GitHub Pages.
  base: "/portfolio/",
  plugins: [react()],
});
