import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'
import 'vue-js-modal/dist/styles.css'
import OverlayLoading from '@/components/OverlayLoading'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import TwButton from '@/components/Button/Button'
import TwTable from '@/components/Table'
import TwModal from '@/components/Modal'
import TwInput from '@/components/Form/Input'

// register variable
const components = {
  OverlayLoading,
  DropdownMenu,
  TwButton,
  TwTable,
  TwModal,
  TwInput
}

// vue register global component
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

// vue register plugin
Vue.use(VModal)
