/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      'custom-green':'#d5ebeb',
      'custom-blue': '#86c9d0',
      'custom-dark-green': '#b1cccc',
      'custom-lime': '#cad4ae',
      'custom-orange': '#edcbbb',
      'custom-orange-light': '#f2e4dc',
      'custom-orange-dark': '#f0b89c'
    }},
  },
  plugins: [],
}