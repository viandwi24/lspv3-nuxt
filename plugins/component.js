import Vue from 'vue'
import OverlayLoading from '@/components/OverlayLoading'

const components = {
  OverlayLoading
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
