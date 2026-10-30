import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{outDir:'wordpress/wp-content/themes/anz-2027/assets/dist',emptyOutDir:true,manifest:true,rollupOptions:{input:'src/main.ts',output:{entryFileNames:'main.js',assetFileNames:'[name][extname]'}}}});
