<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Skema Sertifikasi
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
            @click.native="modalOpen('create')"
          />
        </div>
        <div slot="selected-row-actions">
          <tw-button text="Hapus Item" type="danger" size="xs" icon="trash-alt" @click.native="modalBulkDelete" />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" :router="{ name: 'admin-skema-id', params: { id: props.row.id } }" />
            <tw-button class-btn="mx-0" type="danger" size="xs" icon="trash-alt" @click.native="modalDelete(props)" />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>

    <tw-modal name="modal" :title="(mode == 'create') ? 'Tambah' : 'Edit'" :options="{}">
      <form>
        <tw-input title="Judul" :value.sync="input.title" />
        <tw-input title="Kode Nomor" :value.sync="input.code" />
        <tw-input title="Deskripsi" :value.sync="input.description" type="textarea" />
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="modalSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useOurTableActionModal } from '@/api/modal.js'
import { useOurCrudSchema, url } from '@/api/admin/schema.js'
export default {
  setup (props, { root, refs }) {
    const initInput = ['id', 'title', 'description', 'code']
    const { tableOptions } = useOurTable(url)
    const { create, update, destroy } = useOurCrudSchema(root)
    const {
      mode,
      input,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'tuk', { create, update, destroy }, initInput)

    return {
      tableOptions,
      mode,
      input,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Admin - Skema'
  }
}

function useOurTable (url) {
  const tableOptions = reactive({
    url,
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
        label: 'Judul',
        field: 'title',
        searchable: true,
        sortable: true
      },
      {
        label: 'Nomor / Kode',
        field: 'code',
        searchable: true,
        sortable: true
      },
      {
        label: 'Status',
        field: 'status',
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
