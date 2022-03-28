import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 传统浏览器支持
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

// vant 按需加载
import styleImport from 'vite-plugin-style-import';

// 开发环境代理host
const API_HOST = 'http://gateway-one-beta.speiyou.cn'
const LOCAL_HOST = 'one-dev.speiyou.cn'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-vite/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  plugins: [vue(), legacy({
    targets: ['> 1%', 'last 2 versions', 'not dead']
  }), styleImport({
    libs: [
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`,
      },
    ],
  })],
  server: {
    open: true,
    host: LOCAL_HOST,
    port: 8082,
    proxy: {
      '/SPLAT': {
        target: API_HOST,
        changeOrigin: true,
        followRedirects: false,
        // rewrite: path => path.replace(/^\/SPLAT/, '')
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        //
      }
    }
  },
})
