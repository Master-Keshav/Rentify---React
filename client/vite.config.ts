// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// rentify/client/vite.config.ts
import react from "@vitejs/plugin-react";

export default {
  base: "/rentify/client/",
  plugins: [react()],
};
