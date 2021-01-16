import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['ky'],
  },
  alias: {
    '@': path.resolve(__dirname, '/src'),
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
})
