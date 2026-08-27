/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        panel: '#141414',
        paper: '#F5F0E6',
        accent: '#E63946',
        highlight: '#F4C430',
        muted: '#8A8A8A',
      },
      fontFamily: {
        hand: ['var(--font-hand)', 'cursive'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
