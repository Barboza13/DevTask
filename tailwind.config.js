/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/**/*.js", "./resources/**/*.vue"],
    theme: {
        extend: {
            colors: {
                background: "#e5e7eb",
                primary: "#4A2364",
                secondary: "#001a57",
                dark: "#222",
            },
        },
    },
    plugins: [],
}
