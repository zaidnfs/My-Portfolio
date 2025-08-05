// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        madefor: ['Madefor', '"Helvetica Neue"', 'Helvetica', 'Arial', 'meiryo', '"hiragino kaku gothic pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}