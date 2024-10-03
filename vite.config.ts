import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import rawloader from "vite-raw-plugin";

//Define config
export default defineConfig({
    plugins: [
        vue(),
        rawloader({
            fileRegex: /\.md$/
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
});
