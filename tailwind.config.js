const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      mono: ['PT Mono', ...defaultTheme.fontFamily.mono],
      sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif]
    }
  },
  variants: {},
  plugins: []
}
