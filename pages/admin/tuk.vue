<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Tempat Uji Kompetensi (TUK)
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
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" @click.native="openModal('edit', props)" />
            <tw-button class-btn="mx-0" type="danger" size="xs" icon="trash-alt" @click.native="deleteModal(props)" />
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
        <tw-input title="Alamat" :value.sync="modalOptions.input.address" />
        <tw-input title="Nomor Telepon" :value.sync="modalOptions.input.phone" />
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
    const { tableOptions } = useOurTable()
    const { create, update, destroy } = useOurCrudPlace(root)
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
    title: 'Dashboard - Admin - Tuk'
  }
}

function useOurCrudPlace ($root) {
  const url = 'admin/places'

  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.post(`${url}`, data)
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
        const response = $root.$axios.put(`${url}/${id}`, data)
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
        const response = $root.$axios.delete(`${url}/${id}`)
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
      address: '',
      phone: ''
    }
  })

  const closeModalRefreshTable = () => {
    $refs.table.load()
    $root.$modal.hide('modal')
  }

  const deleteModal = (data) => {
    confirmDelete(
      `Kamu akan menghapus tuk "${data.row.name}"`
    ).then((result) => {
      if (result.value) {
        deleteData([data.row.id])
      }
    })
  }

  const confirmDelete = (text) => {
    return $root.$swal({
      title: 'Apakah kamu yakin?',
      text,
      icon: 'warning',
      showCancelButton: true
    })
  }

  const bulkDeleteModal = (data) => {
    const selected = $refs.table.selectedRows
    const ids = []
    for (const i in selected) {
      ids.push(selected[i].id)
    }
    confirmDelete(
      `Kamu akan menghapus tuk dengan id "${(ids)}"`
    ).then((result) => {
      if (result.value) {
        deleteData(ids)
      }
    })
  }

  const deleteData = async (data) => {
    $root.$overlayLoading.show()
    await $root.$sleep(500)
    crud.destroy(data).then((res) => {
      $root.$swal(
        'Terhapus!',
        'Item yang terpilih berhasil dihapus.',
        'success'
      ).then(() => {
        closeModalRefreshTable()
      })
    }).finally(() => $root.$overlayLoading.hide())
  }

  const saveModal = async (data) => {
    const mode = modalOptions.mode
    const input = modalOptions.input

    // create
    $root.$overlayLoading.show()
    await $root.$sleep(500)
    if (mode === 'create') {
      crud.create(input).then((res) => {
        if (res.status === 201) {
          $root.$swal(
            'Ditambahkan!',
            'Item yang dibuat berhasil ditambahkan.',
            'success'
          ).then(() => {
            closeModalRefreshTable()
          })
        }
      }).finally(() => $root.$overlayLoading.hide())

    // update
    } else if (mode === 'edit') {
      crud.update(input).then((res) => {
        $root.$swal(
          'Diperbarui!',
          'Item yang diedit berhasil diperbarui.',
          'success'
        ).then(() => {
          closeModalRefreshTable()
        })
      }).finally(() => $root.$overlayLoading.hide())
    }
  }

  const openModal = (mode = 'create', data = {}) => {
    // handle mode
    modalOptions.mode = mode
    if (mode === 'edit') {
      modalOptions.input = {
        id: data.row.id,
        name: data.row.name,
        address: data.row.address,
        phone: data.row.phone
      }
    } else if (mode === 'create') {
      modalOptions.input = { name: '', address: '', phone: '' }
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
    url: '/admin/places',
    perPage: 10,
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
        label: 'Alamat',
        field: 'address',
        searchable: true,
        sortable: true
      },
      {
        label: 'Nomor Telepon',
        field: 'phone',
        searchable: true,
        sortable: true
      },
      {
        label: 'Actions',
        field: 'action',
        searchable: false,
        sortable: false
      }
    ]
  })

  return {
    tableOptions
  }
}

</script>
