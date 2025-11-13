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
      'forest': '#1A472A',      
      'gold': '#C9A43C',       
      'off-white': '#F3F4F6',   
      'dark-gray': '#111827',     
    },
  },
},
  plugins: [],
}