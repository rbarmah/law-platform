/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'hubtel-orange': '#FF6634',
        'hubtel-teal': '#00C9B6',
        'hubtel-navy': '#001B36'
      }
    }
  },
  plugins: [],
}