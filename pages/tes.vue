<template>
  <div class="bg-blue-400 min-h-screen">
    <div class="container mx-auto py-4">
      <h1 class="text-2xl text-white text-center">
        DataTable Vue
      </h1>
      <vue-good-table
        mode="remote"
        :total-rows="totalRecords"
        :is-loading.sync="isLoading"
        :pagination-options="{ enabled: true }"
        :search-options="{ enabled: true, trigger: 'enter' }"
        :line-numbers="true"
        :rows="rows"
        :columns="columns"
        :select-options="{ enabled: true }"
        @on-search="onSearchChange"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        @on-per-page-change="onPerPageChange"
        @on-selected-rows-change="onSelectedRowsChange"
      >
        <div slot="selected-row-actions">
          <tw-button text="Hapus Semua" type="danger" size="lg" />
        </div>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      totalRecords: 0,
      rows: [],
      columns: [
        {
          label: 'Name',
          field: 'name',
          searchable: true
        },
        {
          label: 'Description',
          field: 'description',
          searchable: true
        }
      ],
      params: {
        columnFilters: {},
        sort: {
          field: 'name',
          type: 'asc'
        },
        page: 1,
        perPage: 10
      }
    }
  },
  mounted () {
    this.load()
    console.log('start')
  },
  methods: {
    updateParams (newProps) {
      this.params = Object.assign({}, this.params, newProps)
    },
    onPageChange (params) {
      this.updateParams({ page: params.currentPage })
      this.load()
    },
    onPerPageChange (params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.load()
    },
    onSortChange (params) {
      this.updateParams({
        sort: params[0],
        page: 1
      })
      this.load()
    },
    onColumnFilter (params) {
      this.updateParams(params)
      this.load()
    },
    onSearchChange (params) {
      this.updateParams({
        search: params.searchTerm
      })
      this.load()
    },
    onSelectedRowsChange (params) {
      console.log(params)
    },
    load () {
      const params = {
        ...this.params,
        columns: this.columns
      }
      this.$axios.get('/admin/categories', { params }).then((res) => {
        console.log(res.data)
        this.totalRecords = res.data.totalRecords
        this.rows = res.data.data
      }).catch((err) => {
        const res = err.response
        this.$toast.error(res.statusText, { duration: 5000 })
      })
    }
  }
}
</script>
