// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf6ee',
        paperdark: '#f1e9d8',
        ink: '#2f2a24',
        inksoft: '#6b6156',
        sage: '#8fa68e',
        terracotta: '#c97b5d',
        dustyblue: '#7d93a8',
        mustard: '#d9a441',
      },
      fontFamily: {
        hand: ['Caveat', 'cursive'],
        book: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
