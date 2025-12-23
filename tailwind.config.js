/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        'cream-dark': '#F0EDE8',
        ink: '#1A1A1A',
        gold: '#C9A962',
        'gold-light': '#D4BC7D',
        'gold-dark': '#B8944D',
        bronze: '#8B7355',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['EB Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'reveal': 'reveal 1s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 169, 98, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 169, 98, 0.8)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
