<template>
  <modal
    :name="name"
    :adaptive="modalOptions.adaptive"
    :scrollable="modalOptions.scrollable"
    :height="modalOptions.height"
    :max-height="modalOptions.maxHeight"
    :click-to-close="modalOptions.clickToClose"
  >
    <!-- <slot /> -->
    <div class="flex flex-col flex-grow py-4 px-5 h-full min-h-full">
      <div class="flex justify-between items-center pb-3">
        <p class="text-2xl font-bold">
          {{ title }}
        </p>
        <div class="modal-close cursor-pointer z-50" @click="$modal.hide(name)">
          <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
      </div>
      <div class="flex-1 px-1 overflow-x-hidden overflow-y-auto">
        <slot />
      </div>
      <div class="flex justify-end pt-2">
        <slot name="footer" :modal="{ name, title, hide: () => $modal.hide(name) }" />
      </div>
    </div>
  </modal>
</template>

<script>
import { reactive, onBeforeMount } from '@vue/composition-api'
// import {} from '@vue/composition-api'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: undefined
    },
    options: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      required: true
    }
  },
  setup (props) {
    let modalOptions = reactive({
      adaptive: true,
      scrollable: true,
      height: 'auto',
      maxHeight: 500,
      // width: 'auto',
      maxWidth: '100vw',
      clickToClose: false
    })

    onBeforeMount(() => {
      modalOptions = Object.assign({}, modalOptions, props.options)
      console.log({
        modalOptions,
        opt: props.options
      })
    })

    return {
      modalOptions
    }
  }
}
</script>
