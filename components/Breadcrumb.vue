<template>
  <nav class="breadcrumb p-4 bg-gray-300 rounded font-sans w-full flex">
    <ol v-for="(item, i) in items" :key="i" class="list-reset flex text-grey-dark">
      <li>
        <nuxt-link v-if="typeof item.route !== 'undefined'" :to="(typeof item.route === 'object') ? item.route : { name: item.route }" tag="a" :class="`${btnClassRoute}`">
          {{ item.text }}
        </nuxt-link>
        <a v-else href="javascript:void(0)" :class="btnClass">{{ item.text }}</a>
      </li>
      <li v-if="i !== (items.length - 1)">
        <span class="mx-2 text-gray-600">/</span>
      </li>
      <!-- <li><span class="mx-2">/</span></li>
      <li><a href="#" class="text-blue font-bold">Library</a></li>
      <li><span class="mx-2">/</span></li>
      <li>Data</li> -->
    </ol>
  </nav>
</template>

<script>
import {} from '@vue/composition-api'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    btnClass: {
      type: String,
      default: 'font-semibold text-gray-600'
    },
    btnClassRoute: {
      type: String,
      default: 'font-bold text-blue-500 underline'
    }
  },
  setup (props, { root }) {
    // const items = props.items
  }
}
</script>

<style lang="scss" scoped>
body.dark-theme {
  .dashboard {
    nav.breadcrumb {
      @apply bg-gray-700;
    }
  }
}
</style>
