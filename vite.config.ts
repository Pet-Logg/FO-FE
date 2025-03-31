import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  build: {
    outDir: 'build' // S3 배포용으로 'build/'로 변경
  }
})
