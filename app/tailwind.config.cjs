/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Outfit', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
            },
            colors: {
                'bg-dark': '#060a14',
                'bg-card-dark': 'rgba(255, 255, 255, 0.025)',
            },
            animation: {
                'fadeUp': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(32px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
