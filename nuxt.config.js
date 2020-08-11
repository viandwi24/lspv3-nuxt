
import path from 'path'
export default {
  server: {
    port: (process.env.NODE_ENV === 'production') ? 80 : 3000,
    host: '0.0.0.0'
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.APP_NAME || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/vendor.scss',
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/config',
    { src: '@/plugins/good-table', ssr: false },
    '@/plugins/component',
    '@/plugins/icon',
    '@/plugins/axios',
    '@/plugins/composition-api',
    '@/plugins/helper'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    'nuxt-purgecss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-webfontloader',
    'nuxt-lazy-load',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya',
        cancelButtonText: 'Batal'
      }
    ]
  ],
  router: {
    middleware: ['default']
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-nested': {}
      }
    },
    preset: {
      stage: 1
    }
  },
  /**
   ** Enviroment Variable
   */
  env: {
    API_BASE_URL: 'http://localhost:8000',
    API_PREFIX: 'v1'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /**
   ** PurgeCSS configuration
   */
  purgeCSS: {
    mode: 'postcss',
    enabled: true // (process.env.NODE_ENV === 'production')
  },
  /**
   ** Font configuration
   */
  webfontloader: {
    google: {
      // Loads Lato font with weights 400 and 700
      families: ['Lato:400,700']
    }
  },
  /**
   ** Toast
   */
  toast: {
    position: 'bottom-right',
    register: [
      {
        name: 'unknown_error',
        message: 'Error on process request, try again later. (unknown error)',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /**
   ** Authentication
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'credentials.token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/logout',
      callback: false,
      home: '/dashboard'
    }
  }
}
