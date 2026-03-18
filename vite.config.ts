/// <reference types="vitest" />
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import macrosPlugin from 'vite-plugin-babel-macros'
import { VitePWA } from 'vite-plugin-pwa'

import { manifest } from './manifest'
import { RouterType } from './src/models/router'

const srcPaths = [
  'components',
  'hooks',
  'config',
  'contexts',
  'i18n',
  'lib',
  'models',
  'pages',
  'services',
  'img',
  'utils',
  'test-utils',
]

const srcPathAliases = srcPaths.reduce((acc, dir) => {
  acc[dir] = path.resolve(__dirname, `./src/${dir}`)
  return acc
}, {})

const config = () => {
  const outDir = path.resolve(__dirname, 'dist')
  fs.mkdirSync(outDir, { recursive: true })

  return defineConfig({
    base: '/chitchatter/',
    server: {
      proxy: {
        '/api': {
          target: process.env.IS_E2E_TEST
            ? 'http://localhost:3003'
            : 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir,
      sourcemap: true,
    },
    oxc: {
      inject: {
        Buffer: ['buffer', 'Buffer'],
        global: [path.resolve(__dirname, 'src/shims/global'), 'default'],
        process: ['process', 'default'],
      },
    },
    plugins: [
      tailwindcss(),
      svgr({
        include: '**/*.svg?react',
      }),
      react(),
      macrosPlugin(),
      VitePWA({
        registerType: 'prompt',
        devOptions: {
          enabled: false,
        },
        injectRegister: 'auto',
        filename: 'service-worker.js',
        manifest,
        selfDestroying: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        webtorrent: fileURLToPath(
          new URL(
            './node_modules/webtorrent/webtorrent.min.js',
            import.meta.url
          )
        ),
        buffer: 'buffer',
        process: 'process/browser',
        stream: 'stream-browserify',
        util: 'util',
        ...srcPathAliases,
      },
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: ['**/e2e/**', '**/node_modules/**'],
      coverage: {
        reporter: ['text', 'html'],
        exclude: ['node_modules/', 'src/setupTests.ts'],
      },
      env: {
        VITE_ROUTER_TYPE: RouterType.BROWSER,
      },
    },
  })
}

export default config
