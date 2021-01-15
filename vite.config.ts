import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'
import path from 'path'

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
