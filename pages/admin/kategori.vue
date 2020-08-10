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

    <tw-modal name="modal" :title="(modalOptions.mode == 'create') ? 'Tambah' : 'Edit'">
      <form>
        <tw-input title="Nama" :value.sync="modalOptions.input.name" />
        <tw-input title="Deskripsi" :value.sync="modalOptions.input.description" />
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup () {
    const { tableOptions } = useOurTable()
    const { modalOptions, openModal } = useOurModal()

    return {
      tableOptions,
      modalOptions,
      openModal
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - Admin - Kategori'
  }
}

function useOurModal () {
  const modalOptions = reactive({
    mode: 'create',
    input: {
      name: '',
      description: ''
    }
  })

  function openModal (mode = 'create', data = {}) {
    // handle mode
    this.modalOptions.mode = mode
    if (mode === 'edit') {
      this.modalOptions.input = {
        name: data.row.name,
        description: data.row.description
      }
    } else if (mode === 'create') {
      this.modalOptions.input = { name: '', description: '' }
    }

    // show modal
    this.$modal.show('modal')
  }

  return {
    modalOptions,
    openModal
  }
}

function useOurTable () {
  const tableOptions = reactive({
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
        label: 'Nama',
        field: 'name',
        searchable: true,
        sortable: true
      },
      {
        label: 'Deskripsi',
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
    selectOptions: { enabled: true, selectOnCheckboxOnly: true },
    lineNumbers: true,
    searchOptions: { enabled: true },
    paginationOptions: {}
  })

  return {
    tableOptions
  }
}
</script>
