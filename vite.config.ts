import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { InlineConfig } from 'vitest/node';
import type { UserConfig } from 'vite';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
    },
    globals: true,
    setupFiles: [
      path.resolve(
        import.meta.dirname,
        './test-support/setupTests.js',
      ),
    ],
  },
};

// https://vite.dev/config/
export default defineConfig(config);