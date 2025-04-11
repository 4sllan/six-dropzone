import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: './src/runtime/Dropzone.vue',
            name: 'SixDropzone',
            formats: ['es', 'cjs'],
            fileName: (format) => format === 'es' ? 'index.mjs' : 'index.cjs'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        outDir: 'dist'
    }
})