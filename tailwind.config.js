/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ['Alexandria', 'sans-serif'],
        marhey:     ['Marhey', 'cursive', 'sans-serif'],
        readex:     ['Readex Pro', 'sans-serif'],
      },
      colors: {
        'rose-charcoal': '#3B2129',
        blush: {
          50:  '#FFF7FA',
          100: '#FFE8F0',
          200: '#FFD1DC',
          300: '#FFB3C6',
          400: '#FF85A2',
          500: '#FF69B4',
          600: '#F0509A',
          700: '#D83382',
          800: '#B01E64',
          900: '#7E1145',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'blush-sm': '0 4px 15px rgba(255, 105, 180, 0.15)',
        'blush-md': '0 10px 30px rgba(255, 105, 180, 0.22)',
        'blush-lg': '0 20px 50px rgba(255, 105, 180, 0.32)',
        'card-glow': '0 0 25px rgba(255, 182, 193, 0.5), 0 8px 30px rgba(74, 44, 54, 0.08)',
      },
    },
  },
  plugins: [],
}
