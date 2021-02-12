 // tailwind.config.js
 module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theme: {
          light: '#ECFDF5',
          DEFAULT: '#10B981',
          dark: '#047857',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
 }