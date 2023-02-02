import { defineConfig } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [
    vue(),
    vueI18n({
      include: [path.resolve(__dirname, './src/i18n/messages.ts')],
      runtimeOnly: false,
    }),
    Components({
      dts: true,
    }),
  ],
  server: {
    port: 8080,
    host: true
  },
  build: {
    minify: true,
    outDir: 'dist',
  }
})
