const path = require('path');

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    build: {
        outDir: 'public/dist',
        rollupOptions: {
          input: {
            main: 'resource/css/app.css'
          }
        }
    },
    plugins: [
        vue(),
        laravel({
            input: [
                'resource/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            '@': '/resources/js',
        }
    },
});
