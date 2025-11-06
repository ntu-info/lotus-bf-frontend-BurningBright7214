// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // 如果部署到專案頁面，取消下面這行的註解並修改 repo 名稱
  // base: '/lotus-bf-frontend-BurningBright7214/',
  // 如果部署到個人 GitHub Pages (username.github.io)，使用下面這行
  base: '/',

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

