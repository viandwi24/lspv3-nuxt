import Vue from 'vue'
import OverlayLoading from '@/components/OverlayLoading'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import TwButton from '@/components/Button/Button'

// register variable
const components = {
  OverlayLoading,
  DropdownMenu,
  TwButton
}
const plugins = {
}

// vue register global component
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

// vue register plugin
Object.entries(plugins).forEach((plugin) => {
  Vue.use(plugin)
})
