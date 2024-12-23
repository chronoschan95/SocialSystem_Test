/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#EC4899', // pink-500
            },
            transitionProperty: {
                'colors': 'background-color, border-color, color, fill, stroke',
            },
        },
    },
    plugins: [],
}