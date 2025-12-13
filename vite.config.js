import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],

    build: {
        minify: false,

        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ArcanaDataTable',
            fileName: (format) => `arcana-datatable.${format}.js`,
        },

        rollupOptions: {
            // Ensure dependencies are externalized to avoid bundling them
            external: ['vue', '@imengyu/vue3-context-menu'],
            output: {
                globals: {
                    vue: 'Vue',
                    '@imengyu/vue3-context-menu': 'ContextMenu',
                },
            },
        },
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js', // Ensure compatibility with Vue setup
            '@': '/src', // Alias for easy imports
        },
    },
});
