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
            "@": path.resolve(__dirname, "resources/ts"),
            "@views": path.resolve(__dirname, "resources/ts/views"),
            "@interfaces": path.resolve(__dirname, "resources/ts/interfaces"),
            "@components": path.resolve(__dirname, "resources/ts/components"),
            "@layouts": path.resolve(__dirname, "resources/ts/layouts"),
            "@transitions": path.resolve(__dirname, "resources/ts/transitions"),
            "@services": path.resolve(__dirname, "resources/ts/services"),
        },
    },
})
