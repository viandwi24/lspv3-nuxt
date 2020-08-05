<template>
  <div>
    <div class="border border-gray-400 text-gray-700 px-4 py-3 relative bg-gray-100 shadow" role="alert">
      <strong class="font-bold">Selamat Datang!</strong>
      <span class="block sm:inline">Hai {{ firstName }}, Kamu masuk sebagai Asesi.</span>
    </div>
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
  middleware: ['auth', 'is_asesi'],
  transition: 'default',
  head: {
    title: 'Dashboard - Asesi'
  }
}
</script>
