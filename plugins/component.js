import Vue from 'vue'
import OverlayLoading from '@/components/OverlayLoading'
// import Dropdown from '@/components/Menu/Dropdown'
import DropdownMenu from '@innologica/vue-dropdown-menu'

const components = {
  OverlayLoading,
  DropdownMenu
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
