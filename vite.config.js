import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/ecommerce/',  // ✅ Important: match your ingress or NodePort path
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: mode === 'development' 
          ? 'http://localhost:8081'   // local dev
          : 'http://backend:8090',    // inside K8s cluster
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
  }
}));
