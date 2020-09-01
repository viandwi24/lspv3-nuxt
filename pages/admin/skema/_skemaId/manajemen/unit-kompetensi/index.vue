<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Unit Kompetensi
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <tw-alert alert="left-accent-border" type="warning" class="mb-3">
        <p class="font-bold">
          Peringatan
        </p>
        <p>
          Mengganti Unit Kompetensi dapat mempengaruhi beberapa informasi lainnya yang
          saling terkait. Disarankan untuk merancang Unit Kompetensi sebenar - benarnya
          sebelum menulis fitur lainnya.
        </p>
      </tw-alert>
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
          <tw-button
            text="Lihat Lengkap"
            type="warning"
            size="sm"
            @click.native="openUnitKompetensiResult()"
          />
        </div>
        <div slot="selected-row-actions">
          <tw-button text="Hapus Item" type="danger" size="xs" icon="trash-alt" @click.native="modalBulkDelete" />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button text="Elemen" class-btn="mx-0" type="success" size="xs" :router="{ name: 'admin-skema-skemaId-manajemen-unit-kompetensi-unitKompetensiId-elemen', params: { skemaId: skema.id, unitKompetensiId: props.formattedRow.id } }" />
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
      <form @submit.prevent="modalSave">
        <tw-input title="Kode" :value.sync="input.code" />
        <tw-input title="Judul" :value.sync="input.title" />
        <tw-input title="Tipe Standar" :value.sync="input.standard_type" />
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="modalSave" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>

    <tw-modal name="result" :title="'Unit Kompetensi'" :options="{}">
      <div v-for="(unit, i) in unitKompetensiResult" :key="i" class="mb-10">
        <div class="text-lg">
          {{ i+1 }}. {{ unit.title }}
        </div>
        <table v-for="(elemen, j) in unit.work_elements" :key="j" class="table table-sm table-bordered table-hover" style="margin-bottom: 0px !important;">
          <tr>
            <td colspan="2">
              <b>Element : </b>{{ (i+1) }}.{{ j+1 }}.  {{ elemen.title }}
            </td>
          </tr>
          <tr>
            <th width="10%">
              #
            </th>
            <th>
              Kriteria Untuk Kerja
            </th>
          </tr>
          <tr v-for="(kuk, k) in elemen.job_criterias" :key="k">
            <td class="text-center">
              {{ (i+1) }}.{{ j+1 }}.{{ k+1 }}
            </td>
            <td>{{ kuk.title }}</td>
          </tr>
        </table>
      </div>
    </tw-modal>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api'
import { useOurTableActionModal } from '@/api/modal.js'
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
import { url, useOurCrudUnitKompetensi } from '@/api/admin/competency-unit.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)
    const { tableOptions } = useOurTable(url(skema.id))

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Manajemen' },
      { text: 'Unit Kompetensi' }
    ]

    return {
      skema,
      breadcrumbs,
      tableOptions
    }
  },
  setup (props, { root, refs }) {
    const initInput = ['id', 'code', 'title', 'standard_type']
    const { create, update, destroy } = useOurCrudUnitKompetensi(root.$route.params.skemaId, root)
    const {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'unit kompetensi', { create, update, destroy }, initInput)
    const {
      openUnitKompetensiResult,
      unitKompetensiResult
    } = useModalResultUnitKompetensi(
      url(root.$route.params.skemaId),
      root
    )

    return {
      input,
      mode,
      modalOpen,
      modalSave,
      modalDelete,
      modalBulkDelete,
      openUnitKompetensiResult,
      unitKompetensiResult
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head () {
    return {
      title: `Dashboard - Admin - Skema - ${this.skema.title} - Manajemen - Unit Kompetensi`
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
        label: 'Kode',
        field: 'code',
        searchable: true,
        sortable: true
      },
      {
        label: 'Judul Unit',
        field: 'title',
        searchable: true,
        sortable: true
      },
      {
        label: 'Tipe Standar',
        field: 'standard_type',
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

function useModalResultUnitKompetensi (url, $root) {
  const unitKompetensiResult = ref({})

  const openUnitKompetensiResult = async () => {
    $root.$overlayLoading.show()
    await $root.$sleep(100)
    try {
      unitKompetensiResult.value = (await $root.$axios.get(`${url}/full`)).data.data
      console.log(
        unitKompetensiResult.value
      )
      $root.$modal.show('result')
    } catch (err) {
    }
    $root.$overlayLoading.hide()
  }

  return {
    openUnitKompetensiResult,
    unitKompetensiResult
  }
}
</script>
