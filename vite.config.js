import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'

// 构建结束后复制一份 index.html 为 404.html，保证 GitHub Pages 刷新深链接不 404
function copy404Plugin() {
  return {
    name: 'copy-index-to-404',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist')
      const indexFile = path.join(distDir, 'index.html')
      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, path.join(distDir, '404.html'))
      }
    }
  }
}

export default defineConfig({
  base: '/learning-platform/',
  plugins: [vue(), copy404Plugin()],
  server: {
    port: 5173,
    open: true
  }
})
