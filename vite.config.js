import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Si despliegas en GitHub Pages con un repositorio llamado 'nombre-repo', cámbialo a '/nombre-repo/'
});
