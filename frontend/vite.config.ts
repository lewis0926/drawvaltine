import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, existsSync, copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-config',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/config.json') {
            const configPath = resolve(__dirname, 'config.json')
            if (existsSync(configPath)) {
              res.setHeader('Content-Type', 'application/json')
              res.end(readFileSync(configPath, 'utf-8'))
              return
            }
          }
          next()
        })
      },
      closeBundle() {
        const src = resolve(__dirname, 'config.json')
        const dest = resolve(__dirname, 'dist', 'config.json')
        if (existsSync(src)) {
          copyFileSync(src, dest)
        }
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})