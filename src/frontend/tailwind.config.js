/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans:['Roboto','sans-serif']
      },
      colors: {
        colorPrin: '#1D4ED8', 
      },
    },
  },
  plugins: [],
}

