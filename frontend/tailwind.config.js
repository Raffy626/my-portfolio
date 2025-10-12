/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // font modern
      },
      colors: {
        dark: "#0f0f0f",
        light: "#f9f9f9",
      },
    },
  },
  plugins: [],
}
