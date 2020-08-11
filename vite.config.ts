import * as reactPlugin from 'vite-plugin-react'
import type {UserConfig} from 'vite'
import path from 'path'

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  optimizeDeps: {
    include: ['ky', 'react-query-devtools'],
  },
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
}

export default config
