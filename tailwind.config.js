module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pr: "#AA5E5E",
        sr:"#AB4843"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}