import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Movies-Series-Persons/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
build: {
  commonjsOptions: {
    esmExternals: true;
  }
}
