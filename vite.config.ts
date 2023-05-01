import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, './src/')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components/')
      },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages/') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks/') },
      {
        find: '@glbComponents',
        replacement: path.resolve(__dirname, './src/glbComponents/')
      },
      {
        find: '@glbHooks',
        replacement: path.resolve(__dirname, './src/glbHooks/')
      },
      {
        find: '@icons',
        replacement: path.resolve(__dirname, './src/components/icons/')
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, './src/store/')
      },
    ]
  }
})
