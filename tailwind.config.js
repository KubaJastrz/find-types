/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require('tailwindcss/plugin')

const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  13: '3.25rem',
  14: '3.5rem',
  15: '3.75rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  full: '100%',
}

module.exports = {
  purge: ['./index.html', './src/**/*.tsx', './src/**/*.ts', './src/**/*.css'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  theme: {
    spacing,
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
  plugins: [
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
