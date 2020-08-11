/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.css'],
  theme: {
    screens: {
      xs: {min: '360px'},
      sm: {min: '425px'},
      md: {min: '768px'},
      lg: {min: '992px'},
      xl: {min: '1200px'},
      xxl: {min: '1440px'},
    },
    extend: {
      colors: {
        primary: 'hsl(204, 100%, 40%)',
        success: 'hsl(147, 60%, 50%)',
        warning: 'hsl(55, 90%, 45%)',
        neutral: 'hsl(204, 15%, 65%)',

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
      boxShadow: (theme) => ({
        'outline-primary': `0 0 0 1px ${theme('colors.primary')}`,
      }),
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
    },
  },
  variants: {
    textOpacity: ['hover', 'focus', 'focus-within'],
  },
  plugins: [
    require('@tailwindcss/ui'),
    plugin(function ({addUtilities}) {
      const textShadow = {
        '.text-shadow-px': {
          textShadow: '1px 1px rgba(0, 0, 0, 0.3)',
        },
      }

      const grid = {
        '.grid-cols-status': {
          gridTemplateColumns: 'max-content 1fr',
        },
      }

      addUtilities(textShadow)
      addUtilities(grid)
    }),
    plugin(function ({addBase, theme}) {
      addBase({
        body: {
          color: theme('colors.gray-blue.100'),
          backgroundColor: theme('colors.gray-blue.900'),
        },
        h1: {color: theme('colors.white')},
        h2: {color: theme('colors.white')},
        h3: {color: theme('colors.white')},
        h4: {color: theme('colors.white')},
        'button:disabled': {
          cursor: 'default',
        },
      })
    }),
  ],
}
