import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import pkg from './package.json'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    Components({
      dirs: ['./src/components'],
      dts: true
    }),
    AutoImport({
      dts: './auto-imports.d.ts',
      defaultExportByFilename: false,
      vueTemplate: true,
      include: [
        /\.[tj]sx?$/,
        /\.vue\??/,
        /\.mdx?$/
      ],
      dirs: [
        './src/composables/**',
        './src/utils/**'
      ],
      imports: [
        'vue'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    cssCodeSplit: false,
    rollupOptions: {
      external: Object.keys(pkg.dependencies || {}),
      output: {
        entryFileNames: 'threeSixtyContentScreen.js',
        chunkFileNames: 'threeSixtyContentScreen-[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'threeSixtyContentScreen.css'
          return assetInfo.name
        }
      }
    }
  }
})
