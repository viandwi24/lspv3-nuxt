<template>
  <div class="border border-gray-400 text-gray-700 px-4 py-3 relative bg-gray-100 shadow" role="alert">
    <strong class="font-bold">Selamat Datang!</strong>
    <span class="block sm:inline">Hai {{ firstName }}, Kamu masuk sebagai Admin.</span>
  </div>
  <!-- <div class="flex space-x-4">
    <div class="w-full sm:w-9/12">
    </div>
    <div class="w-full sm:w-3/12 bg-gray-100 shadow-md rounded px-8 py-6">
      <img src="@/assets/images/illustration/welcome.svg" alt="Illustration">
    </div>
  </div> -->
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
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Admin'
  }
}
</script>
