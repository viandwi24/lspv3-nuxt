<template>
  <div>
    <h1 class="text-4xl text-gray-800">
      Kategori
    </h1>
    <table class="rwd-table">
      <tr>
        <th>Title</th>
        <th>Genre</th>
        <th>Year</th>
        <th>Gross</th>
      </tr>
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

<style lang="scss" scoped>
$breakpoint-alpha: 480px;

.rwd-table {
  margin: 1em 0;
  min-width: 300px;
  width: 100%;

  tr {
    border: 1px solid #ddd;
  }

  th {
    display: none;
  }

  td {
    display: block;

    &:first-child {
      padding-top: .5em;
    }
    &:last-child {
      padding-bottom: .5em;
    }

    &:before {
      content: attr(data-th)": ";
      font-weight: bold;

      width: 6.5em;
      display: inline-block;

      @media (min-width: $breakpoint-alpha) {
        display: none;
      }
    }
  }

  th, td {
    text-align: left;

    @media (min-width: $breakpoint-alpha) {
      display: table-cell;
      padding: .25em .5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }

  }
}

.rwd-table {
  background: theme('colors.gray.100');
  color: theme('colors.gray.900');
  border-radius: .1em;
  overflow: hidden;
  @apply shadow-xl;
  tr {
    border-color: theme('colors.gray.400');

    &:hover {
  background: theme('colors.gray.200');
    }
  }
  th {
    background: #fff;
    @apply shadow-md;
  }
  th, td {
    margin: .5em 1em;
    @media (min-width: $breakpoint-alpha) {
      padding: 1em !important;
    }
  }
  th, td:before {
    color: theme('colors.gray.900');
    @apply font-semibold;
  }
}
</style>
