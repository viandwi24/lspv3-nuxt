<template>
  <vue-good-table
    ref="vuegoodtable"
    :mode="mode"
    :total-rows="totalRecords"
    :is-loading.sync="isLoading"
    :pagination-options="paginationOptions"
    :search-options="searchOptions"
    :group-options="groupOptions"
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
    <div slot="table-actions">
      <div class="flex justify-between">
        <slot name="table-actions" />
        <tw-button type="primary" size="sm" icon="sync-alt" @click.native="load" />
      </div>
    </div>
    <div slot="selected-row-actions">
      <slot name="selected-row-actions" />
    </div>
    <div slot="table-row" slot-scope="props">
      <slot name="table-row" :column="props.column" :formattedRow="props.formattedRow" :index="props.index" :row="props.row" />
    </div>
    <div v-if="mode === 'remote'" slot="table-actions-bottom">
      <div class="flex flex-grow justify-between px-4 py-1 text-xs">
        <div>
          <span class="text-gray-800">Total Record : </span>
          <span class="text-gray-700">{{ totalRecords }}</span>
        </div>
        <div>
          <span class="text-gray-800">Rows in this page : </span>
          <span class="text-gray-700">{{ rows.length }}</span>
        </div>
        <div>
          <span class="text-gray-800">Data Show : </span>
          <span class="text-gray-700">{{ dataShow }}</span>
        </div>
        <div>
          <span class="text-gray-800">Total Page : </span>
          <span class="text-gray-700">{{ totalPages }}</span>
        </div>
      </div>
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
      totalPages: 0,
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
      groupOptions: {},
      selectOptions: { enabled: true, selectOnCheckboxOnly: true },
      searchOptions: { enabled: true, trigger: 'enter' },
      sortOptions: { enabled: true, initialSortBy: [] },
      paginationOptions: { enabled: true, perPageDropdown: [5, 10, 20, 50, 100] }
    }
  },
  computed: {
    dataShow () {
      // alert(this.rows.length)
      // alert(this.params.page)
      if (this.rows.length === 0 && this.params.page === 1) { return 0 }
      const start = ((this.params.page - 1) * this.params.perPage) + 1
      const end = (this.params.page * this.rows.length)
      return start + ' - ' + end
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
    if (this.ifExist(options.url)) {
      this.url = options.url
      this.mode = 'remote'
    } else {
      this.mode = 'client'
    }
    if (this.ifExist(options.rows)) { this.rows = options.rows }
    if (this.ifExist(options.selectOptions)) { this.selectOptions = options.selectOptions }
    if (this.ifExist(options.lineNumbers)) { this.lineNumbers = options.lineNumbers }
    if (this.ifExist(options.searchOptions)) { this.searchOptions = options.searchOptions }
    if (this.ifExist(options.sortOptions)) { this.sortOptions = options.sortOptions }
    if (this.ifExist(options.groupOptions)) { this.groupOptions = options.groupOptions }
    if (this.ifExist(options.sort)) {
      this.params.sort = options.sort
      this.sortOptions.initialSortBy = options.sort
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    tes (data) {
      console.log(data)
    },
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
        // console.log(res.data)
        this.totalRecords = res.data.totalRecords
        this.rows = res.data.data
        this.totalPages = res.data.meta.totalPage
        if (res.data.meta.page > res.data.meta.totalPage) {
          this.updateParams({ page: res.data.meta.totalPage })
          this.load()
        }
      }).catch((err) => {
        const res = err.response
        this.$toast.error(res.statusText, { duration: 5000 })
      }).finally(() => {
        this.isLoading = false
      })
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>
