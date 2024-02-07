import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import eslint from 'vite-plugin-eslint'

export default defineConfig( {
  plugins: [ react(), eslint(), VitePWA( { registerType: 'autoUpdate' } ) ],
  define: { __BUILD_DATE__: `"${ new Date().toISOString() }"` }
} )
