const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'PT Mono',
          ...defaultTheme.fontFamily.mono,
        ]
      },
    },
  },
  variants: {},
  plugins: [],
}
