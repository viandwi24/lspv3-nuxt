<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Kategori
      </h1>
    </div>
    <div class="shadow-xl">
      <tw-table ref="table" :options="tableOptions">
        <div slot="table-actions">
          <tw-button text="Tambah" type="success" size="sm" icon="plus" @click.native="openModal('create')" />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button text="" type="warning" size="xs" icon="edit" @click.native="openModal('edit', props)" />
            <tw-button text="" type="danger" size="xs" icon="trash-alt" @click.native="tes(props)" />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>

    <tw-modal name="modal" title="Example Modal">
      <form>
        <tw-input title="Name" :value.sync="modalOptions.input.name" />
        <span class="text-red-500">
          {{ modalOptions.input.name }}
        </span>
        <tw-input title="Tes" />
      </form>
    </tw-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableOptions: {
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
          },
          {
            label: 'Actions',
            field: 'action',
            searchable: false,
            sortable: false
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
      },
      modalOptions: {
        mode: 'create',
        input: {
          name: '',
          tes: ''
        }
      }
    }
  },
  mounted () {
    // this.$modal.show('my-first-modal')
  },
  methods: {
    tes (data) {
      console.log(data)
    },
    openModal (mode = 'create', data = {}) {
      this.modalOptions.mode = mode
      this.$modal.show('modal')
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
