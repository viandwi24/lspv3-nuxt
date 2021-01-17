<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Asesor
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'admin' },{ text: 'User' },{ text: 'Asesor' }]" />
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
        <tw-input title="Username Id" :value.sync="input.username" />
        <tw-input title="Email" :value.sync="input.email" />
        <tw-select title="Status" :value.sync="input.status" :data="{ 'Active': 'Active','Inactive': 'Inactive', 'Suspended': 'Suspended' }" />
        <tw-input title="Password" :value.sync="input.password" />
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
import { useOurCrudAssessor, url } from '@/api/admin/assessor.js'
export default {
  setup (props, { root, refs }) {
    const initInput = [
      ['id', ''],
      ['name', ''],
      ['username', ''],
      ['email', ''],
      ['status', ''],
      ['password', '']
    ]
    const { tableOptions } = useOurTable(url)
    const { create, update, destroy } = useOurCrudAssessor(root)
    const {
      mode,
      input,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'asesor', { create, update, destroy }, initInput)

    return {
      tableOptions,
      input,
      mode,
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
    title: 'Dashboard - Admin - User - Asesor'
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
        label: 'Nama',
        field: 'name',
        searchable: true,
        sortable: true
      },
      {
        label: 'Username',
        field: 'username',
        searchable: true,
        sortable: true
      },
      {
        label: 'Email',
        field: 'email',
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
        label: 'Terakhir Login',
        field: 'last_login',
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
