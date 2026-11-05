import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mirror the production security headers from vercel.json in `vite preview`
// so CSP problems show up locally before deploying.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const prodHeaders = Object.fromEntries(
  (vercel.headers.find((h) => h.source === '/(.*)')?.headers ?? []).map(({ key, value }) => [key, value])
);
delete prodHeaders['Strict-Transport-Security']; // meaningless on http://localhost
prodHeaders['Content-Security-Policy'] = prodHeaders['Content-Security-Policy']?.replace('; upgrade-insecure-requests', '');

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 4173, headers: prodHeaders },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
