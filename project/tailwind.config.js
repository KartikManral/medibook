/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D9E75',
          light: '#E8F7F2',
          mid: '#2DB88A',
          dark: '#157A5A',
          50: '#F0FAF6',
          100: '#D4F0E5',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
