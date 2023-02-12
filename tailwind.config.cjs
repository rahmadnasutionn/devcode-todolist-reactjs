/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            Poppins: ["Poppins, sans-serif"],
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            light: {
                ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                primary: "#16ABF8",
                secondary: "#888888",
                accent: "#F4F4F4",
                error: "#ED4C5C",
                "base-100": "#fcfcfc",
                "--rounded-btn": "9999px",
                "--animation-input": "0.1s",
            },
        }, ],
    },
};