import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export a function to access 'mode'
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'production' ? '/resume-builder/' : '/', // 👈 replace with your repo name
  };
});
