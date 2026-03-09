import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "light-green": "#93DA97",
                "dark-green": "#004030",
            },

            // toast custom animation
            keyframes: {
                enter: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-10px) scale(0.95)",
                    },
                    "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
                },
                leave: {
                    "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
                    "100%": {
                        opacity: 0,
                        transform: "translateY(-10px) scale(0.95)",
                    },
                },
            },
            animation: {
                enter: "enter 0.2s ease-out",
                leave: "leave 0.15s ease-in forwards",
            },
        },
    },

    plugins: [forms],
};
