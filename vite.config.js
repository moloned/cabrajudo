import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        events: resolve(import.meta.dirname, 'events.html'),
        main: resolve(import.meta.dirname, 'index.html'),
        alonzo: resolve(import.meta.dirname, 'alonzo.html'),
        payments: resolve(import.meta.dirname, 'payments.html'),
        staff: resolve(import.meta.dirname, 'staff.html'),
        safeguarding: resolve(import.meta.dirname, 'safeguarding.html'),
        policies: resolve(import.meta.dirname, 'policies.html'),
        shop: resolve(import.meta.dirname, 'shop.html'),
        gradings: resolve(import.meta.dirname, 'gradings.html'),
        monStudyGuide: resolve(import.meta.dirname, 'mon-study-guide.html'),
        kyuStudyGuide: resolve(import.meta.dirname, 'kyu-study-guide.html'),
      },
    },
  },
});
