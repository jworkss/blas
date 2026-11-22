import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" permite publicar en cualquier repositorio de GitHub Pages sin cambiar nada
export default defineConfig({ plugins: [react()], base: "./", publicDir: "src/public" });
