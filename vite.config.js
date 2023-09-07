import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "/src/Assets",
      Layouts: "/src/Layouts",
      Redux: "/src/Redux",
      Configs: "/src/Configs",
      Helpers: "/src/Helpers",
      Routes: "/src/Routes"
    }
  },
});
