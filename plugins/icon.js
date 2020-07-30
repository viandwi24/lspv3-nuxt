import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSignInAlt,
  faInfoCircle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
// import {
//   faFontAwesome
// } from '@fortawesome/free-brands-svg-icons'
// import {
//   faUserSecret
// } from '@fortawesome/pro-regular-svg-icons'

library.add(
  faSignInAlt,
  faInfoCircle,
  faArrowLeft
)
Vue.component('icon', FontAwesomeIcon)