<template>
  <div>
    <div class="content-header">
      <div class="md:flex">
        <h1 class="text-4xl text-gray-800 mr-2">
          Buat Permohonan
        </h1>
        <p class="text-sm self-end inline-block mb-3 flex-no-wrap">
          {{ skema.title }}
        </p>
      </div>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'asesi' },{ text: 'Buat Permohonan' }]" />
    </div>

    <div class="shadow-xl bg-white dark:bg-dark rounded-sm border-2 border-gray-100">
      <div class="py-2 px-4 bg-gray-100 dark:bg-dark">
        Unit Skema
      </div>
      <div>
        <table class="table table-sm table-hover mb-0">
          <thead>
            <tr>
              <th width="5%">
                #
              </th>
              <th width="10%">
                Kode
              </th>
              <th>Skema</th>
              <th width="20%">
                Standar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, i) in skema.competency_units" :key="i">
              <td class="text-center">
                {{ i+1 }}
              </td>
              <td class="text-center">
                {{ unit.code }}
              </td>
              <td>{{ unit.title }}</td>
              <td class="text-center">
                {{ unit.standard_type }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="shadow-xl bg-white dark:bg-dark rounded-sm border-2 border-gray-100 mt-4">
      <div class="py-2 px-4 bg-gray-100 dark:bg-dark">
        Unit Skema
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.skemaId)
  },
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)
    console.log(skema)
    return {
      skema
    }
  },
  setup (props, { root, refs }) {
    const { tableOptions } = useOurTable()

    return {
      tableOptions
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_asesi'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Asesi - Buat Permohonan'
  }
}

function useOurTable (url) {
  const tableOptions = reactive({
    rows: [
      {
        mode: 'span',
        label: 'Awaeaeawe',
        html: true,
        children: [
          { id: 1, title: 'aweawe', description: 'waeaweawe' }
        ]
      }
    ],
    groupOptions: {
      enabled: true
    },
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
      }
    ]
  })

  return {
    tableOptions
  }
}
</script>
