import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,        // Habilita as variáveis globais como 'describe', 'it', 'expect', etc.
    environment: 'node', // Configura o ambiente de testes (pode ser 'node' ou 'jsdom')
    transformMode: {
      web: [/\.vue$/],    // Habilita o parser de arquivos .vue
    },
    include: ['src/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.js', 'src/**/*.{test,spec}.vue'],
  },
})

