<template>
  <a v-if="linkType == 'href'" :href="href" :class="`${classInit} ${classType} ${classSize} ${classBtn}`">
    <span v-if="typeof text !== 'undefined'" class="button-content">
      <icon v-if="typeof icon !== 'undefined'" :icon="icon" :class="`button-icon ${classIcon}`" />
      <span class="button-text" :class="classText">{{ text }}</span>
    </span>
    <slot v-else />
  </a>
  <nuxt-link v-else :to="routerOptions" tag="a" :class="`${classInit} ${classType} ${classSize} ${classBtn}`">
    <span v-if="typeof text !== 'undefined'" class="button-content">
      <icon v-if="typeof icon !== 'undefined'" :icon="icon" :class="`button-icon ${classIcon}`" />
      <span class="button-text" :class="classText">{{ text }}</span>
    </span>
    <slot v-else />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    classInit: {
      type: String,
      default: 'button cursor-pointer text-gray-100 rounded font-semibold transition-all duration-100 ease-in hover:text-gray-300 inline-block'
    },
    classBtn: {
      type: String,
      default: 'mx-1'
    },
    classText: {
      type: String,
      default: ''
    },
    classIcon: {
      type: String,
      default: ''
    },
    route: {
      type: String,
      default: undefined
    },
    router: {
      type: Object,
      default: undefined
    },
    href: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  computed: {
    classType () {
      const type = this.type
      let newClass = ''
      switch (type) {
        case 'primary':
          newClass = 'bg-blue-400 hover:bg-blue-600'
          break
        case 'success':
          newClass = 'bg-green-400 hover:bg-green-600'
          break
        case 'warning':
          newClass = 'bg-orange-400 hover:bg-orange-600'
          break
        case 'danger':
          newClass = 'bg-red-400 hover:bg-red-600'
          break
        default:
          break
      }
      return newClass
    },
    classSize () {
      const size = this.size
      let newClass = ''
      switch (size) {
        case 'md':
          newClass = 'text-md px-4 py-2'
          break
        case 'lg':
          newClass = 'text-lg px-4 py-2'
          break
        case 'sm':
          newClass = 'text-sm px-3 py-1'
          break
        case 'xs':
          newClass = 'text-xs px-3 py-1'
          break
        default:
          break
      }
      return newClass
    },
    linkType () {
      return (typeof this.route !== 'undefined' || typeof this.router !== 'undefined')
        ? 'nuxt-link'
        : 'href'
    },
    routerOptions () {
      const options = (typeof this.route !== 'undefined')
        ? { name: this.route }
        : this.router
      return options
    }
  },
  created () {
  }
}
</script>
