import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load .env variables
dotenv.config()

// Build JS content for runtime config
const configContent = `window.__RATTLE_CONFIG__ = {
  VITE_PUBLIC_API_HOST: "${process.env.VITE_PUBLIC_API_HOST ?? ''}"
};
`

// Write to public/js/env.js
const outputPath = path.resolve(__dirname, 'public/js/env.js')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, configContent)

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    server: {
        host: true,
        allowedHosts: true,
    },
})
