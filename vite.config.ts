import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import {defineConfig} from 'vite'

import {babelMacros} from './vite-plugin-babel-macros'

export default defineConfig({
  plugins: [reactRefresh(), babelMacros()],
  optimizeDeps: {
    include: ['ky'],
  },
  alias: {
    '@': path.resolve(__dirname, '/src'),
  },
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
})
