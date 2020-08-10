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
        <div slot="selected-row-actions">
          <tw-button text="Hapus Item" type="danger" size="xs" icon="trash-alt" @click.native="bulkDeleteModal" />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button text="" type="warning" size="xs" icon="edit" @click.native="openModal('edit', props)" />
            <tw-button text="" type="danger" size="xs" icon="trash-alt" @click.native="deleteModal(props)" />
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
        <tw-button text="Simpan" type="primary" icon="save" @click.native="saveModal" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup (props, { root, refs }) {
    const input = reactive({

    })
    const { tableOptions } = useOurTable()
    const { create, update, destroy } = useOurCrudCategory(root, input)
    const {
      modalOptions,
      openModal,
      saveModal,
      deleteModal,
      bulkDeleteModal
    } = useOurModal(root, refs, { create, update, destroy })

    return {
      tableOptions,
      modalOptions,
      openModal,
      saveModal,
      deleteModal,
      bulkDeleteModal
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - Admin - Kategori'
  }
}

function useOurCrudCategory ($root) {
  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.post('admin/categories', data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const update = (data) => {
    const { id } = data
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.put(`admin/categories/${id}`, data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const destroy = (data) => {
    const id = data.join(',')
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.delete(`admin/categories/${id}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  return {
    create,
    update,
    destroy
  }
}

function useOurModal ($root, $refs, crud) {
  const modalOptions = reactive({
    mode: 'create',
    input: {
      name: '',
      description: ''
    }
  })

  const closeModalRefreshTable = () => {
    $refs.table.load()
    $root.$modal.hide('modal')
  }

  const deleteModal = (data) => {
    deleteData([data.row.id])
  }

  const bulkDeleteModal = (data) => {
    const selected = $refs.table.selectedRows
    const ids = []
    for (const i in selected) {
      ids.push(selected[i].id)
    }
    deleteData(ids)
  }

  const deleteData = (data) => {
    $root.$store.commit('SET_LOADING', true)
    crud.destroy(data).then((res) => {
      closeModalRefreshTable()
    }).finally(() => $root.$store.commit('SET_LOADING', false))
  }

  const saveModal = (data) => {
    const mode = modalOptions.mode
    const input = modalOptions.input

    // create
    if (mode === 'create') {
      $root.$store.commit('SET_LOADING', true)
      crud.create(input).then((res) => {
        if (res.status === 201) {
          closeModalRefreshTable()
        }
      }).finally(() => $root.$store.commit('SET_LOADING', false))

    // update
    } else if (mode === 'edit') {
      $root.$store.commit('SET_LOADING', true)
      crud.update(input).then((res) => {
        closeModalRefreshTable()
      }).finally(() => $root.$store.commit('SET_LOADING', false))
    }
  }

  const openModal = (mode = 'create', data = {}) => {
    // handle mode
    modalOptions.mode = mode
    if (mode === 'edit') {
      modalOptions.input = {
        id: data.row.id,
        name: data.row.name,
        description: data.row.description
      }
    } else if (mode === 'create') {
      modalOptions.input = { name: '', description: '' }
    }

    // show modal
    $root.$modal.show('modal')
  }

  return {
    modalOptions,
    openModal,
    saveModal,
    deleteModal,
    bulkDeleteModal
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
