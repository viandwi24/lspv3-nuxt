<template>
  <nav class="breadcrumb px-4 py-2 bg-gray-300 rounded font-sans w-full inline-block md:flex">
    <!-- <ol v-for="(item, i) in items" :key="i" class="list-reset inline-block md:flex text-grey-dark" :class="{ 'flex-1': i === (items.length - 1) }">
      <li class="inline-block md:list-item">
        <nuxt-link v-if="typeof item.route !== 'undefined'" :to="(typeof item.route === 'object') ? item.route : { name: item.route }" tag="a" :class="`${btnClassRoute}`">
          {{ item.text }}
        </nuxt-link>
        <a v-else href="javascript:void(0)" :class="btnClass" class="text-clip">{{ item.text }}</a>
      </li>
      <li class="inline-block md:list-item" v-if="i !== (items.length - 1)">
        <span class="mx-2 text-gray-600">/</span>
      </li>
    </ol> -->
    <ol>
      <li v-for="(item, i) in itemRendered" :key="i" class="list-reset text-grey-dark inline-block">
        <nuxt-link v-if="typeof item.route !== 'undefined'" :to="(typeof item.route === 'object') ? item.route : { name: item.route }" tag="a" :class="`${btnClassRoute}`">
          {{ item.text }}
        </nuxt-link>
        <span v-else-if="item.text == '/'" class="mx-2 text-gray-600">/</span>
        <a v-else href="javascript:void(0)" :class="btnClass" class="break-normal">{{ item.text }}</a>
      </li>
    </ol>
    <!-- <li><span class="mx-2">/</span></li>
    <li><a href="#" class="text-blue font-bold">Library</a></li>
    <li><span class="mx-2">/</span></li>
    <li>Data</li> -->
  </nav>
</template>

<script>
import { onBeforeMount, ref } from '@vue/composition-api'
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
    const itemRendered = ref([])

    onBeforeMount(() => {
      let i = 0
      props.items.forEach((item) => {
        itemRendered.value.push(item)
        if (i !== (props.items.length - 1)) {
          itemRendered.value.push({
            text: '/'
          })
        }
        i++
      })
    })

    return {
      itemRendered
    }
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
