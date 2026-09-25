import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        events: resolve(__dirname, 'events.html'),
        main: resolve(__dirname, 'index.html'),
        alonzo: resolve(__dirname, 'alonzo.html'),
        payments: resolve(__dirname, 'payments.html'),
        staff: resolve(__dirname, 'staff.html'),
        safeguarding: resolve(__dirname, 'safeguarding.html'),
        policies: resolve(__dirname, 'policies.html'),
        shop: resolve(__dirname, 'shop.html'),
        gradings: resolve(__dirname, 'gradings.html'),
        monStudyGuide: resolve(__dirname, 'mon-study-guide.html'),
        kyuStudyGuide: resolve(__dirname, 'kyu-study-guide.html'),
      },
    },
  },
});
