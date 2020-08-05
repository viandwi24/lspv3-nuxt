import Vue from 'vue'
import OverlayLoading from '@/components/OverlayLoading'
// import Dropdown from '@/components/Menu/Dropdown'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import TwButton from '@/components/Button/Button'
// import VueCarousel from 'vue-carousel'

// Vue.use(VueCarousel)

const components = {
  OverlayLoading,
  DropdownMenu,
  TwButton
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
