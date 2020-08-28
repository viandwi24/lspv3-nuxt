<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Kuk
        <icon icon="chevron-right" class="text-3xl" />
        {{ elemen.title }}
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
        <tw-input title="Judul" :value.sync="input.title" />
        <!-- <tw-input title="Kode" :value.sync="input.code" />
        <tw-input title="Tipe Standar" :value.sync="input.standard_type" /> -->
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
import { useOurAsyncDataSlugId as useOurAsyncDataSlugIdSchema } from '@/api/admin/schema.js'
import { useOurAsyncDataSlugId as useOurAsyncDataSlugIdCompetencyUnit } from '@/api/admin/competency-unit.js'
import { useOurAsyncDataSlugId } from '@/api/admin/work-elements.js'
import { url, useOurCrudJobCriteria } from '@/api/admin/job-criteria.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugIdSchema(params, app, redirect)
    const { unitKompetensi } = await useOurAsyncDataSlugIdCompetencyUnit(params, app, redirect)
    const { elemen } = await useOurAsyncDataSlugId(params, app, redirect)
    const { tableOptions } = useOurTable(url(skema.id, unitKompetensi.id, elemen.id))

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skema } } },
      { text: 'Manajemen' },
      { text: 'Unit Kompetensi', route: { name: 'admin-skema-skemaId-manajemen-unit-kompetensi', params: { skema } } },
      { text: app.$limitStr(unitKompetensi.title, 20) },
      { text: 'Elemen', route: { name: 'admin-skema-skemaId-manajemen-unit-kompetensi-unitKompetensiId-elemen', params: { skemaId: skema.id, unitKompetensiId: unitKompetensi.id } } },
      { text: app.$limitStr(elemen.title, 20) },
      { text: 'Kuk' }
    ]

    return {
      skema,
      unitKompetensi,
      elemen,
      breadcrumbs,
      tableOptions
    }
  },
  setup (props, { root, refs }) {
    const initInput = ['id', 'title']
    const { create, update, destroy } = useOurCrudJobCriteria(
      root.$route.params.skemaId,
      root.$route.params.unitKompetensiId,
      root.$route.params.elemenId,
      root
    )
    const {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'kuk', { create, update, destroy }, initInput)

    return {
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
      title: `Dashboard - Admin - Skema - ${this.skema.title} -
       Manajemen - Unit Kompetensi - Elemen - Kuk`
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
        label: 'Kuk',
        field: 'title',
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
