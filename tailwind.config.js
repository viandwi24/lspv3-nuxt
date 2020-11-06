const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ],
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
