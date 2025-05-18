// vite.config.js (Solution radicale)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Plugin pour intercepter et corriger les erreurs URI
const fixURIErrorsPlugin = {
  name: 'fix-uri-errors',
  configureServer(server) {
    // Remplacer le middleware qui cause le problème
    const originalMiddleware = server.middlewares.stack.find(
      middleware => middleware.handle.toString().includes('decodeURI')
    );
    
    if (originalMiddleware) {
      const index = server.middlewares.stack.indexOf(originalMiddleware);
      if (index !== -1) {
        // Remplacer le middleware problématique
        server.middlewares.stack[index] = {
          ...originalMiddleware,
          handle: (req, res, next) => {
            try {
              // Tenter d'exécuter le middleware original
              originalMiddleware.handle(req, res, next);
            } catch (error) {
              if (error.message && error.message.includes('URI malformed')) {
                // Contourner l'erreur en encodant correctement l'URL problématique
                console.warn(`[AVERTISSEMENT] URL malformée détectée: ${req.url}`);
                
                // Encoder l'URL problématique et essayer à nouveau
                const cleanUrl = req.url.replace(/%(?![0-9A-Fa-f]{2})/g, '%25');
                req.url = cleanUrl;
                
                // Continuer avec l'URL corrigée
                next();
              } else {
                // Pour les autres erreurs, les propager
                throw error;
              }
            }
          }
        };
        
        console.log('[Vite] Middleware de correction URI installé');
      }
    }
  }
};

export default defineConfig({
  plugins: [
    react(),
    fixURIErrorsPlugin
  ],
  
  // Configuration pour le développement
  server: {
    port: 5173,
    open: true, // Ouvre automatiquement le navigateur
  },
  
  // Résolution des chemins
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Facilite les imports
    },
  },
  
  // Options de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser', // Pour une meilleure minification
  }
});