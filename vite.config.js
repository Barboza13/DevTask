import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import laravel from "laravel-vite-plugin"
import path from "path"

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/ts/app.ts"],
            refresh: true,
        }),
        vue(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources"),
        },
    },
})
