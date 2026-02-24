import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import eslint from 'vite-plugin-eslint'

const vitePWAConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifestFilename: 'manifest.json',
  manifest: {
    background_color: '#010C1E',
    theme_color: '#010C1E',
    display: 'fullscreen',
    description: 'Getting people to talk about the stuff that really matters',
    icons: [
      {
        src: 'favicon.svg',
        type: 'image/svg+xml',
        purpose: 'any maskable',
        sizes: '200x200'
      },
      {
        src: 'google-touch-icon.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
  }
}

export default defineConfig( {
  plugins: [ tailwindcss(), react(), eslint(), VitePWA( vitePWAConfig ) ],
  define: { __BUILD_DATE__: `"${ new Date().toISOString() }"` },
  build: { chunkSizeWarningLimit: 10000 }, // 10 MB
} )
