// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
        aboutstress: resolve(__dirname, 'about-stress.html'),
        analysis: resolve(__dirname, 'analysis.html'),
        chat: resolve(__dirname, 'chat.html'),
        home: resolve(__dirname, 'home.html'),
        hrvanalysis: resolve(__dirname, 'hrv-analysis.html'),
        professionalchat: resolve(__dirname, 'professional-chat.html'),
        professional: resolve(__dirname, 'professional.html'),
        relaxationexercises: resolve(__dirname, 'relaxation-exercise.html'),
        tips: resolve(__dirname, 'tips.html'),

      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});