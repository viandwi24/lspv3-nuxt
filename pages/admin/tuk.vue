<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Tempat Uji Kompetensi (TUK)
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'admin' },{ text: 'Tempat Uji Kompetensi' }]" />
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
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" @click.native="modalOpen('edit', props)" />
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
        <tw-input title="Nama" :value.sync="input.name" />
        <tw-input title="Alamat" :value.sync="input.address" />
        <tw-input title="Nomor Telepon" :value.sync="input.phone" />
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
import { useOurCrudPlace } from '@/api/admin/place.js'
export default {
  setup (props, { root, refs }) {
    const initInput = ['id', 'name', 'address', 'phone']
    const { tableOptions } = useOurTable()
    const { create, update, destroy } = useOurCrudPlace(root)
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
    title: 'Dashboard - Admin - Tuk'
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
