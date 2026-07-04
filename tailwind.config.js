/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ebay: {
          blue: '#3665f3',
          red: '#e53238',
          yellow: '#f5af02',
          green: '#1a7a3e',
          link: '#0654ba',
          dark: '#191919',
          lightGrey: '#f7f7f7',
          borderGrey: '#e5e5e5',
          textGrey: '#707070',
          hoverGrey: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Market Sans"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
