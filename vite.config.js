import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/NOMBRE-REPO/', // Cambia NOMBRE-REPO por el nombre de tu repositorio
});
