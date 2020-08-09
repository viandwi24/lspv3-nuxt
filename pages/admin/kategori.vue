<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Kategori
      </h1>
    </div>
    <div class="shadow-xl">
      <tw-table ref="table" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {
        url: '/admin/categories',
        perPage: 5,
        sort: [
          { field: 'id', type: 'asc' }
        ],
        columns: [
          {
            label: 'ID',
            field: 'id',
            searchable: true,
            sortable: true
          },
          {
            label: 'Name',
            field: 'name',
            searchable: true,
            sortable: true
          },
          {
            label: 'Description',
            field: 'description',
            searchable: true,
            sortable: true
          }
        ],
        rows: [
          { id: 10, name: 'Example 1', description: 'Description 1' },
          { id: 20, name: 'Example 2', description: 'Description 2' }
        ],
        selectOptions: { enabled: true },
        lineNumbers: true,
        searchOptions: { enabled: true },
        paginationOptions: {}
      }
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - Admin - Kategori'
  }
}
</script>
