import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import seoPages from './scripts/seo-pages.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(),
    tailwindcss(),
    seoPages(), // per-page HTML for search engines and link previews
  ],
  // Console messages stay in `npm run dev` but are stripped from the live site.
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
}))
