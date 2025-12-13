import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue() as any],
    test: {
        environment: 'happy-dom',
        globals: true,
        include: ['tests/**/*.test.ts'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})
