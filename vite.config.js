import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/offftape/', // Nome do repositório no GitHub
  plugins: [react()],
});
