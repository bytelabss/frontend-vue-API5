import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
    }
  },
  test: {
    globals: true,  // Habilita o uso de funções globais como beforeEach, afterEach, etc.
    environment: 'jsdom',  // Ambiente para testes DOM
    transformMode: {
      web: [/\.[jt]sx?$/],  // Garantir a transformação correta de arquivos JS/TSX
    },
  },
})
