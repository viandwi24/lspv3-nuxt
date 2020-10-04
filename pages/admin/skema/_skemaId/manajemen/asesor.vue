<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Manajemen Asesor
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
            @click.native="modalOpen('create')"
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
        <tw-input title="Asesor" type="custom">
          <v-select :options="assessors" :reduce="assessor => assessor.id" @search="onAssessorSearch">
            <template slot="no-options">
              Ketik nama untuk mencari asesor...
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
import { url as urlAssessor } from '@/api/admin/assessor.js'
import { url, useOurCrudAssessor as useOurCrudSchemaAssessor } from '@/api/admin/schema/assessor.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)
    const { assessors } = await useOurAsyncDataAssessors(app)

    console.log(assessors)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Manajemen' },
      { text: 'Asesor' }
    ]

    return {
      skema,
      breadcrumbs
    }
  },
  setup (props, { root, refs }) {
    const initInput = ['id', 'user_id']
    const { create, destroy } = useOurCrudSchemaAssessor(root.$route.params.skemaId, root)
    const { tableOptions } = useOurTable(url(root.$route.params.skemaId))
    const {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'asesor', { create, destroy }, initInput)
    const { assessors, onAssessorSearch } = useOurAssessorSearch(root.$route.params.skemaId, root)

    return {
      assessors,
      onAssessorSearch,
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
  head () {
    return {
      title: `Dashboard - Admin - Skema - ${this.skema.title} - Manajemen - Asesor`
    }
  }
}

function useOurAssessorSearch (skemaId, root) {
  const assessors = ref([])

  const onAssessorSearch = async function (search, loading) {
    loading(true)
    assessors.value = []
    try {
      const { data } = await root.$axios.get(`${urlAssessor}`)
      if (typeof data.data !== 'undefined') {
        data.data.forEach((el) => {
          assessors.value.push({ label: `${el.id} - ${el.name}`, id: el.id })
        })
      }
    } catch (e) {
    }
    loading(false)
  }

  return {
    onAssessorSearch,
    assessors
  }
}

async function useOurAsyncDataAssessors (app) {
  let assessors = []

  try {
    const { data } = await app.$axios.get(`${urlAssessor}`)
    if (typeof data.data !== 'undefined') {
      data.data.forEach((el) => {
        assessors.push({ label: `${el.id} - ${el.name}`, id: el.id })
      })
    }
  } catch (e) {
    assessors = []
  }

  return {
    assessors
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
