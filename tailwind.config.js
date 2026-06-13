/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf3',
          100: '#d1fadf',
          200: '#a6f4c5',
          300: '#74eaae',
          400: '#49e092',
          500: '#30d158',
          600: '#26b84d',
          700: '#1e9a41',
          800: '#1a7d38',
          900: '#155f2c',
        },
      },
      ringColor: {
        DEFAULT: '#30d158',
      },
      ringOffsetColor: {
        DEFAULT: '#ecfdf3',
      },
      outlineColor: {
        primary: '#30d158',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
