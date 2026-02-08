/** @type {import('tailwindcss').Config} */
module.exports = {
  // AJOUTEZ CETTE LIGNE :
  darkMode: 'selector', 
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
