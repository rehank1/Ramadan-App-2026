import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ramadan 2026 India',
        short_name: 'Ramadan 2026',
        description: 'Prayer times and timetable for Ramadan 2026 in India',
        theme_color: '#0a0f1e',
        background_color: '#0a0f1e',
        display: 'standalone',
        icons: [
          { src: '/moon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.aladhan\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aladhan-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
            }
          }
        ]
      }
    })
  ],
  // For GitHub Pages deployment with a repo sub-path, set base to your repo name:
  // base: '/ramadan-2026-india/',
  base: '/',
});
