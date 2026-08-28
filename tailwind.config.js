// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware palette: RGB-triplet CSS variables defined in index.css.
        // `:root` holds the daylight paper palette; `html.dark` flips the same
        // variables for night reading, so every opacity modifier keeps working.
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        paperdark: 'rgb(var(--c-paperdark) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        inksoft: 'rgb(var(--c-inksoft) / <alpha-value>)',
        white: 'rgb(var(--c-white) / <alpha-value>)',
        night: 'rgb(var(--c-night) / <alpha-value>)',
        sage: 'rgb(var(--c-sage) / <alpha-value>)',
        terracotta: 'rgb(var(--c-terracotta) / <alpha-value>)',
        dustyblue: 'rgb(var(--c-dustyblue) / <alpha-value>)',
        mustard: 'rgb(var(--c-mustard) / <alpha-value>)',
      },
      fontFamily: {
        hand: ['Caveat', 'cursive'],
        book: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
