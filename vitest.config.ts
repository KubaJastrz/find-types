import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // See the list of config options in the Config Reference:
    // https://vitest.dev/config/
    environment: 'jsdom',
    includeSource: ['app/**/*.{ts,tsx}'],
    coverage: {
      reporter: process.env.CI ? 'json' : 'html-spa',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
    },
  },
  plugins: [react()],
});
