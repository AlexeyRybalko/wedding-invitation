import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const siteBase = process.env.VITE_SITE_BASE ?? '/wedding-invitation/'

export default defineConfig({
  base: siteBase,
  plugins: [react()],
})
