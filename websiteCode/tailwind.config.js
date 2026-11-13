/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Core brand green (the club logo is a deep forest green)
        forest: {
          50: '#F1F7F3',
          100: '#DDEBE2',
          200: '#BCD7C6',
          300: '#8FBBA0',
          400: '#5F9B77',
          500: '#3F8059',
          600: '#2E6746',
          700: '#25533A',
          800: '#1D4230',
          900: '#14301F',
          950: '#0A1F14',
          DEFAULT: '#1D4230',
          light: '#2E6746',
          dark: '#0A1F14',
        },
        // Fresh mint used for glows, highlights and "live" indicators
        mint: {
          300: '#9BE3BC',
          400: '#6FD39F',
          500: '#3FBF7F',
        },
        // Buoy orange: the accent. Matches the real buoy, pops against green.
        buoy: {
          300: '#FFB27F',
          400: '#FF8A4C',
          500: '#F26B21',
          600: '#D9560F',
          700: '#B3440B',
        },
        cream: '#F5F7F1',
        // legacy token names kept so older components still compile
        gold: '#F26B21',
        'dark-gray': '#111827',
        'page-green-dark': '#B8D1C3',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A1F14 0%, #14301F 55%, #1D4230 100%)',
        'page-gradient': 'linear-gradient(to bottom, #F5F7F1, #E6EFE8)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,31,20,0.05), 0 8px 24px -8px rgba(10,31,20,0.12)',
        lift: '0 2px 4px rgba(10,31,20,0.06), 0 20px 40px -16px rgba(10,31,20,0.28)',
        glow: '0 0 0 1px rgba(111,211,159,0.35), 0 10px 30px -8px rgba(63,191,127,0.45)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: { 'fade-up': 'fade-up 0.7s ease-out both' },
    },
  },
  plugins: [],
}
