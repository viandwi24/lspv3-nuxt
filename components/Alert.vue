<template>
  <div class="alert" :class="alert" role="alert">
    <div v-if="alert === 'left-accent-border'" class="border-l-4 p-4" :class="`${type} ${classType}`">
      <slot />
    </div>
    <div v-else :class="`${type} ${classType}`">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    alert: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: 'primary'
    },
    classType: {
      type: String,
      default: ''
    }
  }
}
</script>
