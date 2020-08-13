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
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" @click.native="advancedModalOpen('edit', props)" />
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
        <!-- <tw-input title="Waktu Pelaksanaan" :value.sync="input.date" /> -->
        <div class="mb-4">
          <label for="waktu-pelaksanaan" class="block text-gray-700 text-sm font-bold mb-2">
            Waktu Pelaksanaan
          </label>
          <date-picker
            v-model="input.date"
            placeholder="dd-MM-yyyy"
            format="dd-MM-yyyy"
            input-class="bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-md"
          />
        </div>
        <!-- <tw-input title="Pengumuman" :value.sync="input.announcement" /> -->
        <div class="mb-4">
          <label for="announcement" class="block text-gray-700 text-sm font-bold mb-2">
            Pengumuman
          </label>
          <vueditor ref="editor" />
        </div>
        <!-- <tw-input title="Agenda" :value.sync="modalOptions.input.agenda" /> -->
        <div>
          <div class="font-semibold text-gray-700 text-sm mb-2">
            Kegiatan
          </div>
          <tw-button
            class-btn="mx-0 mb-2"
            type="success"
            size="xs"
            icon="plus"
            text="Tambah"
            @click.native="agendaAdd"
          />
          <table class="table table-sm table-bordered table-hover">
            <thead>
              <th>#</th>
              <th>Waktu</th>
              <th>Kegiatan</th>
              <th>...</th>
            </thead>
            <tbody>
              <tr v-if="typeof input.agenda !== 'undefined' && input.agenda.length === 0">
                <td colspan="4" class="text-center">
                  Belum ada kegiatan di set
                </td>
              </tr>
              <tr v-for="(item, i) in input.agenda" :key="item.$index">
                <td width="10%" class="text-center">
                  {{ i+1 }}
                </td>
                <td>
                  <tw-input title="Waktu" :value.sync="input.agenda[i].time" :with-title="false" size="xs" class-group="m-0" />
                </td>
                <td>
                  <tw-input title="Aktifitas" :value.sync="input.agenda[i].activity" :with-title="false" size="xs" class-group="m-0" />
                </td>
                <td class="text-center">
                  <tw-button class-btn="mx-0" type="danger" size="xs" icon="times" @click.native="agendaDelete(i)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div>
          <span v-for="(item) in input.agenda" :key="item.$index" class="text-red-500">
            {{ item }}
          </span>
          <a href="#" @click.prevent="tes">tes</a>
        </div> -->
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="advancedModalSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
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
    const { agendaAdd, agendaDelete } = useOurCrudAgenda(input)

    const advancedModalSave = async () => {
      await modalSave()
      input.value.announcement = await refs.editor.getContent()
      refs.editor.setContent('')
    }

    const advancedModalOpen = async (m, p) => {
      await modalOpen(m, p)
      refs.editor.setContent('')
      refs.editor.setContent(input.value.announcement)
    }

    return {
      tableOptions,
      mode,
      input,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete,
      agendaAdd,
      agendaDelete,
      advancedModalSave,
      advancedModalOpen
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Admin - Jadwal'
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

function useOurCrudAgenda (input) {
  const agendaAdd = () => {
    input.value.agenda.push({ time: '', activity: '' })
  }

  const agendaDelete = (index) => {
    input.value.agenda.splice(index, 1)
  }

  return {
    agendaAdd,
    agendaDelete
  }
}

</script>
