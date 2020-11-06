<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Manajemen Jadwal
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <tw-table ref="table" :options="tableOptions">
        <div slot="table-actions">
          <tw-button
            text="Tambah"
            class-text="hidden sm:inline"
            type="success"
            size="sm"
            icon="plus"
            @click.native="modalBeforeOpen('create')"
          />
        </div>
        <div slot="selected-row-actions">
          <tw-button text="Hapus Item" type="danger" size="xs" icon="trash-alt" @click.native="modalBulkDelete" />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button class-btn="mx-0" type="danger" size="xs" icon="trash-alt" @click.native="modalDelete(props)" />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>
    <tw-modal name="modal" :title="(mode == 'create') ? 'Tambah' : ''" :options="{}">
      <form @submit.prevent="modalSave">
        <tw-input title="Jadwal" type="custom">
          <v-select v-model="input.schedule_id" :options="schedules" :reduce="schedule => schedule.id" @search="onScheduleSearch">
            <template slot="no-options">
              Ketik nama untuk mencari jadwal...
            </template>
          </v-select>
        </tw-input>
        <!-- <tw-input title="Asesor" :value.sync="input.user_id" /> -->
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="modalSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
import { useOurTableActionModal } from '@/api/modal.js'
import { url, useOurCrudSchedule as useOurCrudSchemaSchedule } from '@/api/admin/schema/schedule.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Manajemen' },
      { text: 'Jadwal' }
    ]

    return {
      skema,
      breadcrumbs
    }
  },
  setup (props, { root, refs }) {
    const initInput = ['id', 'assessor_id']
    const { create, destroy } = useOurCrudSchemaSchedule(root.$route.params.skemaId, root)
    const { tableOptions } = useOurTable(url(root.$route.params.skemaId))
    const {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'asesor', { create, destroy }, initInput)
    const { schedules, onScheduleSearch } = useOurScheduleSearch(root.$route.params.skemaId, root)
    const scheduleId = ref(0)

    const modalBeforeOpen = async (mode) => {
      schedules.value = []
      await modalOpen(mode)
    }

    return {
      scheduleId,
      schedules,
      onScheduleSearch,
      tableOptions,
      input,
      mode,
      modalBeforeOpen,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head () {
    return {
      title: `Dashboard - Admin - Skema - ${this.skema.title} - Manajemen - Asesor`
    }
  }
}

function useOurScheduleSearch (skemaId, root) {
  const schedules = ref([])

  const onScheduleSearch = async function (search, loading) {
    loading(true)
    schedules.value = []
    try {
      const { data } = await root.$axios.get(`${url(skemaId)}?add`)
      if (typeof data.data !== 'undefined') {
        data.data.forEach((el) => {
          schedules.value.push({ label: `${el.id} - ${el.name}`, id: el.id })
        })
      }
    } catch (e) {
    }
    loading(false)
  }

  return {
    onScheduleSearch,
    schedules
  }
}

// async function useOurAsyncDataPlaces (app) {
//   let places = []

//   try {
//     const { data } = await app.$axios.get(`${urlPlace}`)
//     if (typeof data.data !== 'undefined') {
//       data.data.forEach((el) => {
//         places.push({ label: `${el.id} - ${el.name}`, id: el.id })
//       })
//     }
//   } catch (e) {
//     places = []
//   }

//   return {
//     places
//   }
// }

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
