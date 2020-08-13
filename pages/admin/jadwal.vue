<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Jadwal
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
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" @click.native="modalOpen('edit', props)" />
            <tw-button class-btn="mx-0" type="danger" size="xs" icon="trash-alt" @click.native="modalDelete(props)" />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>

    <tw-modal name="modal" :title="(mode == 'create') ? 'Tambah' : 'Edit'" :options="{ clickToClose: false }">
      <form>
        <tw-input title="Nama" :value.sync="input.name" />
        <tw-input title="Waktu Pelaksanaan" :value.sync="input.date" />
        <tw-input title="Pengumuman" :value.sync="input.announcement" />
        <!-- <tw-input title="Agenda" :value.sync="modalOptions.input.agenda" /> -->
        <div>
          <span v-for="(item) in input.agenda" :key="item.$index" class="text-red-500">
            {{ item }}
          </span>
          <a href="#" @click.prevent="tes">tes</a>
        </div>
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="modalSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive, watchEffect, ref, computed } from '@vue/composition-api'
import { useOurTableActionModal } from '@/api/modal.js'
import { useOurCrudSchedule, url } from '@/api/admin/schedule.js'
export default {
  setup (props, { root, refs }) {
    const initInput = [
      ['id', ''],
      ['name', ''],
      ['date', ''],
      ['announcement', ''],
      ['agenda', []]
    ]
    const { tableOptions } = useOurTable(url)
    const { create, update, destroy } = useOurCrudSchedule(root)
    const {
      mode,
      input,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'jadwal', { create, update, destroy }, initInput)
    const { agenda, tes } = useOurModalAgenda(input)

    return {
      tableOptions,
      agenda,
      tes,
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
  transition: 'default',
  head: {
    title: 'Dashboard - Admin - Jadwal'
  }
}

function useOurModalAgenda (input) {
  const agendaData = ref([])

  watchEffect(() => {
    console.log(input.value)
    agendaData.value = input.value.agenda
  })

  const agenda = computed(() => {
    return agendaData.value
  })

  const tes = () => {
    input.value.agenda.push('tes')
  }

  return {
    agenda,
    tes
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
        label: 'Waktu Pelaksanaan',
        field: 'date',
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
