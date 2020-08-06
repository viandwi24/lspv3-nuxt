<template>
  <div>
    <h1 class="text-4xl text-gray-800">
      Kategori
    </h1>
    <table class="tw-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Gross</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td data-th="Title">
            Star Wars
          </td>
          <td data-th="Genre">
            Adventure, Sci-fi
          </td>
          <td data-th="Year">
            1977
          </td>
          <td data-th="Gross">
            $460,935,665
          </td>
        </tr>
      </tbody>
    </table>
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
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - Admin'
  }
}
</script>
