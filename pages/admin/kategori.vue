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
          <tw-button
            text="Tambah"
            class-text="hidden sm:inline"
            type="success"
            size="sm"
            icon="plus"
            @click.native="openModal('create')"
          />
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
import { useOurTableActionModal } from '@/api/modal.js'
import { useOurCrudCategory } from '@/api/admin/category.js'
export default {
  setup (props, { root, refs }) {
    const input = ['id', 'name', 'description']
    const { tableOptions } = useOurTable()
    const { create, update, destroy } = useOurCrudCategory(root)
    const {
      modalOptions,
      openModal,
      saveModal,
      deleteModal,
      bulkDeleteModal
    } = useOurTableActionModal(root, refs, 'kategori', { create, update, destroy }, input)

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

function useOurTable () {
  const tableOptions = reactive({
    url: '/admin/categories',
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
    ]
  })

  return {
    tableOptions
  }
}

</script>
