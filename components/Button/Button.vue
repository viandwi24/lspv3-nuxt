<template>
  <a v-if="linkType == 'href'" :href="href" class="" :class="`${classInit} ${classType} ${classSize}`">
    <span v-if="text != ''">{{ text }}</span>
    <slot v-else />
  </a>
  <nuxt-link v-else :to="{ name: route }" tag="a" class="" :class="`${classInit} ${classType} ${classSize}`">
    <span v-if="text != ''">{{ text }}</span>
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
      default: 'cursor-pointer text-gray-100 mx-1 rounded font-semibold transition-all duration-100 ease-in hover:text-gray-300'
    },
    route: {
      type: String,
      default: undefined
    },
    href: {
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
          newClass = 'text-sm px-4 py-2'
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
      return (typeof this.route !== 'undefined')
        ? 'nuxt-link'
        : 'href'
    }
  },
  mounted () {
  }
}
</script>
