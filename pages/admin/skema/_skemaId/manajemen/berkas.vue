<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Manajemen Berkas Pendaftaran
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
            <tw-button class-btn="mx-0" type="warning" size="xs" icon="edit" @click.native="advancedModalOpen('edit', props)" />
            <tw-button class-btn="mx-0" type="danger" size="xs" icon="trash-alt" @click.native="modalDelete(props)" />
          </div>
          <div v-else-if="props.column.field == 'format'">
            {{ props.formattedRow[props.column.field].join(', ') }}
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>
    <tw-modal name="modal" :title="(mode == 'create') ? 'Tambah' : ''" :options="{}" tabindex="-1">
      <form @submit.prevent="modalSave">
        <tw-input title="Nama File" :value.sync="input.name" />
        <tw-input title="Format" type="custom">
          <v-select v-model="formatSelected" class="vue-select" :multiple="true" :options="formats" />
        </tw-input>
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="modalBeforeSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
import { useOurTableActionModal } from '@/api/modal.js'
import { url, useOurCrudSchemaFile } from '@/api/admin/schema/file.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Manajemen' },
      { text: 'Berkas' }
    ]

    return {
      skema,
      breadcrumbs
    }
  },
  setup (props, { root, refs }) {
    const initInput = ['id', 'name', 'format']
    const { create, update, destroy } = useOurCrudSchemaFile(root.$route.params.skemaId, root)
    const { tableOptions } = useOurTable(url(root.$route.params.skemaId))
    const {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'berkas', { create, update, destroy }, initInput)

    const formats = reactive([
      { label: '.pdf', code: '.pdf' },
      { label: '.doc', code: '.doc' },
      { label: '.docx', code: '.docx' },

      { label: '.png', code: '.png' },
      { label: '.jpg', code: '.jpg' },
      { label: '.jpeg', code: '.jpeg' },
      { label: '.bmp', code: '.bmp' }
    ])

    const formatSelected = ref([])

    const modalBeforeOpen = async (mode) => {
      await modalOpen(mode)
    }

    const modalBeforeSave = async () => {
      const format = []
      formatSelected.value.forEach((e) => {
        format.push(e.code)
      })
      input.value.format = format
      await modalSave()
    }

    const advancedModalOpen = async (m, p) => {
      await modalOpen(m, p)
      if (m === 'edit') {
        const format = []
        p.formattedRow.format.forEach((e) => {
          format.push({ code: e, label: e })
        })
        input.value.format = format
        formatSelected.value = format
        console.log(input.value.format)
      }
    }

    return {
      formats,
      tableOptions,
      input,
      mode,
      formatSelected,
      modalBeforeOpen,
      modalBeforeSave,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete,
      advancedModalOpen
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head () {
    return {
      title: `Dashboard - Admin - Skema - ${this.skema.title} - Manajemen - Berkas`
    }
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
        label: 'Format',
        field: 'format',
        searchable: false,
        sortable: false
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
