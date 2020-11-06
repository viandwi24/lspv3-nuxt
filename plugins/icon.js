import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSignInAlt,
  faInfoCircle,
  faArrowLeft,
  faCircleNotch,
  faHome,
  faSignOutAlt,
  faUserAlt,
  faListAlt,
  faCogs,
  faSearch,
  faBars,
  faTimes,
  faTrashAlt,
  faEdit,
  faPlus,
  faSave,
  faSyncAlt,
  faChevronRight,
  faClock,
  faBuilding,
  faUserCheck,
  faCog,
  faListOl,
  faListUl,
  faCheckDouble,
  faCheckCircle,
  faPenAlt,
  faUsers,
  faQuestionCircle,
  faUserEdit,
  faUserFriends,
  faCalendarAlt,
  faClipboardList,
  faScroll,
  faCalendarDay
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
  faArrowLeft,
  faCircleNotch,
  faHome,
  faSignOutAlt,
  faUserAlt,
  faListAlt,
  faCogs,
  faSearch,
  faBars,
  faTimes,
  faTrashAlt,
  faEdit,
  faPlus,
  faSave,
  faSyncAlt,
  faChevronRight,
  faClock,
  faBuilding,
  faUserCheck,
  faCog,
  faListOl,
  faListUl,
  faCheckDouble,
  faCheckCircle,
  faPenAlt,
  faUsers,
  faQuestionCircle,
  faUserEdit,
  faUserFriends,
  faCalendarAlt,
  faClipboardList,
  faScroll,
  faCalendarDay
)
Vue.component('icon', FontAwesomeIcon)
