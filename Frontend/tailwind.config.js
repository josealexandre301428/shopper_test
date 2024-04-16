/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/Pages/**/*.{html,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}

