/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: { min: '360px' },
      sm: { min: '425px' },
      md: { min: '768px' },
      lg: { min: '992px' },
      xl: { min: '1200px' },
      xxl: { min: '1440px' },
    },
    extend: {
      colors: {
        primary: 'hsl(204, 100%, 40%)',
        success: 'hsl(147, 60%, 50%)',
        warning: 'hsl(55, 90%, 45%)',
        neutral: 'hsl(204, 15%, 65%)',
        neutral2: 'hsl(211deg, 25%, 84%)',

        'gray-blue': {
          100: 'hsl(204, 10%, 90%)',
          200: 'hsl(204, 10%, 75%)',
          300: 'hsl(204, 15%, 65%)',
          400: 'hsl(204, 15%, 59%)',
          500: 'hsl(204, 15%, 50%)',
          600: 'hsl(204, 20%, 40%)',
          700: 'hsl(204, 20%, 30%)',
          750: 'hsl(204, 20%, 25%)',
          800: 'hsl(204, 20%, 20%)',
          900: 'hsl(204, 30%, 12%)',
        },
      },
      animation: {
        flow: 'flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite both',
      },
      keyframes: (theme) => ({
        flow: {
          '0%, 80%, 100%': {
            transform: 'scale(0.3)',
            backgroundColor: theme('colors.white'),
          },
          '40%': {
            transform: 'scale(1)',
            backgroundColor: theme('colors.cool-gray.300'),
          },
        },
      }),
      zIndex: {
        1: 1,
      },
    },
  },
  plugins: [],
};
