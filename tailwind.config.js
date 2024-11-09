/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.ts", "./resources/**/*.vue"],
    theme: {
        extend: {
            colors: {
                primary: "#4A2364",
                secondary: "#001a57",
                dark: "#222",
            },
        },
    },
    plugins: [],
}
