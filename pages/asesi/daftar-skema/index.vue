<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Daftar Skema
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'asesi' },{ text: 'Daftar Skema' }]" />
    </div>
    <div class="shadow-xl">
      <tw-table ref="table" :options="tableOptions">
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button
              :router="{ name: 'asesi-daftar-skema-skemaId-buat-permohonan', params: { skemaId: props.row.id } }"
              class-btn="mx-0"
              type="warning"
              size="xs"
              icon="edit"
              text="Buat Permohonan"
            />
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { url } from '@/api/accession/schema-list.js'
export default {
  setup (props, { root, refs }) {
    const { tableOptions } = useOurTable(url)

    return {
      tableOptions
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_asesi'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Asesi - Daftar Skema'
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
        label: 'Deskripsi',
        field: 'description',
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
