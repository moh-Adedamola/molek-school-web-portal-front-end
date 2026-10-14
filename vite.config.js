import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(),
    tailwindcss()
  ],
  // Console messages stay in `npm run dev` but are stripped from the live site.
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
}))
