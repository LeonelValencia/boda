import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" → funciona en cualquier repo de GitHub Pages sin tocar nada
export default defineConfig({ base: "./", plugins: [react()] });
