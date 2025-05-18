import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Désactiver websockets pour utiliser une méthode plus fiable
      protocol: 'ws',
      host: 'localhost',
      // Augmenter le timeout
      timeout: 5000
    }
  },
  optimizeDeps: {
    // Forcer la pré-bundling pour éviter les erreurs de streaming
    force: true
  }
});