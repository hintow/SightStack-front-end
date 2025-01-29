import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000, // Specify the port for the preview server
    host: '0.0.0.0',
    allowedHosts: true,
  }
});