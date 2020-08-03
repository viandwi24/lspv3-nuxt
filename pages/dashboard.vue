<template>
  <div>
    <h1 class="text-4xl">
      Hello World!
    </h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_asesi'],
  transition: 'default'
}
</script>
