const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

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
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.coolGray,
    //   red: colors.red,
    //   yellow: colors.amber,
    //   blue: colors.blue,
    //   pink: colors.pink,
    //   orange: colors.orange
    // },
    // borderColor: theme => ({
    //   ...theme('colors'), ...colors.orange
    // })
  },
  variants: {},
  plugins: []
}
