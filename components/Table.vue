<template>
  <vue-good-table
    ref="vuegoodtable"
    mode="remote"
    :total-rows="totalRecords"
    :is-loading.sync="isLoading"
    :pagination-options="paginationOptions"
    :search-options="searchOptions"
    :line-numbers="lineNumbers"
    :rows="rows"
    :columns="columns"
    :select-options="selectOptions"
    :sort-options="sortOptions"
    @on-search="onSearchChange"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange"
    @on-selected-rows-change="onSelectedRowsChange"
  >
    <div slot="selected-row-actions">
      <slot name="selected-row-actions" />
    </div>
    <div slot="table-row" slot-scope="props">
      <slot name="table-row" :column="props.column" :formattedRow="props.formattedRow" :index="props.index" :row="props.row" />
    </div>
  </vue-good-table>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      required: true
    }
  },
  data () {
    return {
      mode: 'remote',
      selectedRows: [],
      isLoading: false,
      totalRecords: 0,
      columns: [],
      rows: [],
      url: '',
      params: {
        columnFilters: {},
        sort: {},
        page: 1,
        perPage: 10
      },

      lineNumbers: true,
      selectOptions: { enabled: true },
      searchOptions: { enabled: true, trigger: 'enter' },
      sortOptions: { enabled: true, initialSortBy: [] },
      paginationOptions: { enabled: true, perPageDropdown: [5, 10, 20, 50, 100] }
    }
  },
  created () {
    const options = this.options
    if (this.ifExist(options.mode)) {
      if (['remote', 'manual'].includes(options.mode)) { this.mode = options.mode }
    }
    if (this.ifExist(options.columns)) { this.columns = options.columns }
    if (this.ifExist(options.perPage)) { this.params.perPage = options.perPage }
    if (this.ifExist(options.page)) { this.params.page = options.page }
    if (this.ifExist(options.url)) { this.url = options.url }
    if (this.ifExist(options.rows)) { this.rows = options.rows }
    if (this.ifExist(options.selectOptions)) { this.selectOptions = options.selectOptions }
    if (this.ifExist(options.lineNumbers)) { this.lineNumbers = options.lineNumbers }
    if (this.ifExist(options.searchOptions)) { this.searchOptions = options.searchOptions }
    if (this.ifExist(options.sortOptions)) { this.sortOptions = options.sortOptions }
    if (this.ifExist(options.sort)) {
      this.params.sort = options.sort
      this.sortOptions.initialSortBy = options.sort
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    ifExist (data) {
      return (typeof data !== 'undefined')
    },
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
        sort: params,
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
      this.selectedRows = this.$refs.vuegoodtable.selectedRows
      this.$emit('onSelectedRowsChange', params)
    },
    load () {
      if (this.mode !== 'remote') { return false }
      this.isLoading = true
      const params = {
        ...this.params,
        columns: this.columns
      }
      this.$axios.get(this.url, { params }).then((res) => {
        console.log(res.data)
        this.totalRecords = res.data.totalRecords
        this.rows = res.data.data
      }).catch((err) => {
        const res = err.response
        this.$toast.error(res.statusText, { duration: 5000 })
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
