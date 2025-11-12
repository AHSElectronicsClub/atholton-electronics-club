/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This scans your app and components folders
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#072A40',
        'navy-light': '#0A3A5A',
        'navy-dark': '#051E2E',
        'teal': '#00B7C2',
        'orange': '#FF7A3D',
        'gray-light': '#F6F7F9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}