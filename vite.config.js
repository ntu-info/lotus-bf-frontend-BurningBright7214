// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // 部署到專案頁面：https://ntu-info.github.io/lotus-bf-frontend-BurningBright7214/
  base: '/lotus-bf-frontend-BurningBright7214/',
  // 如果部署到個人 GitHub Pages (username.github.io)，使用下面這行
  // base: '/',

  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    allowedHosts: ['mil.psy.ntu.edu.tw']
  }
})

