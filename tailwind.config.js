/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B6F4E',      /* Earthy Brown */
        secondary: '#F7F0D7',    /* Warm Beige */
        accent: '#efd594',       /* Soft Yellow */
        highlight: '#FF9F91',    /* Muted Coral */
        'text-dark': '#333333',  /* Dark Gray */
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};