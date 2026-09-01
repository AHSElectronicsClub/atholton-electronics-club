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
        'dark-gray': '#111827',
        
        // --- THIS IS YOUR DARKER GREEN FOR THE GRADIENT (RESTORED) ---
        'page-green-dark': '#B8D1C3', 
      },

      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, #1A472A, #111827)',
        
        // --- THIS IS YOUR PAGE GRADIENT (RESTORED) ---
        // It fades from PURE WHITE to your new DARKER GREEN
        'page-gradient': 'linear-gradient(to bottom, #FFFFFF, #B8D1C3)', 
      }
    },
  },
  plugins: [],
}