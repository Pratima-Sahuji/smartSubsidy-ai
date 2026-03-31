/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earthy: {
          50: '#f1f8f3',
          100: '#ddeee3',
          200: '#bbdbc7',
          300: '#8ec3a4',
          400: '#5fa57c',
          500: '#3e8860',
          600: '#2d6d4a',
          700: '#25583e',
          800: '#1f4633',
          900: '#1a3a2a',
          950: '#0e2018',
        },
        sand: {
          50: '#faf9f6',
          100: '#f2f0e8',
          200: '#e4dfce',
          300: '#d1c7ad',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
