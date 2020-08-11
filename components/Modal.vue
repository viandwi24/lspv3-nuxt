<template>
  <modal :name="name" :adaptive="true" :scrollable="true" height="auto" :max-height="500">
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
      <div class="flex-1 px-1 overflow-x-auto">
        <slot />
      </div>
      <div class="flex justify-end pt-2">
        <slot name="footer" :modal="{ name, title, hide: () => $modal.hide(name) }" />
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>
