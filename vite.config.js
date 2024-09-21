import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import laravel from "laravel-vite-plugin"
import path from "path"

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/ts/app.ts"],
            refresh: true,
        }),
        vue(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/sass/_variables.scss";`, // Importa automáticamente las variables SCSS
            },
        },
    },
})
