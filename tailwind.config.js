/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9d63fc', // lighter purple
          DEFAULT: '#843bfb', // your purple
          dark: '#6a2fd9',   // darker purple
        },
        secondary: {
          light: '#ffd166', // warm yellow
          DEFAULT: '#ffc107', // golden
          dark: '#e5a100',
        },
        accent: {
          light: '#4ce1b6', // mint
          DEFAULT: '#2ccfaa', // teal
          dark: '#1fa088',
        },
        neutral: {
          lightest: '#f8f9fa',
          light: '#e9ecef',
          DEFAULT: '#dee2e6',
          dark: '#343a40',
        }
      }
    },
  },
  plugins: [],
} 