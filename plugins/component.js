import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
import OverlayLoading from '@/components/OverlayLoading'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import TwButton from '@/components/Button/Button'
import TwTable from '@/components/Table'
import TwModal from '@/components/Modal'
import TwInput from '@/components/Form/Input'
import TwBreadcrumb from '@/components/Breadcrumb'
import TwAlert from '@/components/Alert'

// register variable
const components = {
  OverlayLoading,
  DropdownMenu,
  TwButton,
  TwTable,
  TwModal,
  TwInput,
  TwBreadcrumb,
  TwAlert
}

// vue register global component
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

// vue register plugin
Vue.use(VModal)
Vue.use(OverlayScrollbarsPlugin)

// overlay
// OverlayScrollbars(document.body, {
//   nativeScrollbarsOverlaid: {
//     initialize: false
//   }
// })
