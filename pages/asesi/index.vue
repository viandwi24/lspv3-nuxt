<template>
  <div>
    <tw-alert type="primary">
      <strong class="font-bold">Selamat Datang!</strong>
      <span class="block sm:inline">Hai {{ firstName }}, Kamu masuk sebagai Asesi.</span>
    </tw-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    firstName () {
      const name = this.$auth.user.name
      return name.split(' ')[0]
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_accession'],
  transition: 'default',
  head: {
    title: 'Dashboard - Asesi'
  }
}
</script>
