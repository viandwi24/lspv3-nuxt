<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Unit Kompetensi
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <tw-alert alert="left-accent-border" type="warning">
        <p class="font-bold">
          Peringatan
        </p>
        <p>
          Mengganti Unit Kompetensi dapat mempengaruhi beberapa informasi lainnya yang
          saling terkait. Disarankan untuk merancang Unit Kompetensi sebenar - benarnya
          sebelum menulis fitur lainnya.
        </p>
      </tw-alert>
    </div>
  </div>
</template>
<script>
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { id, skema } = await useOurAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-id', params: { id } } },
      { text: 'Manajemen' },
      { text: 'Unit Kompetensi' }
    ]

    return {
      id,
      skema,
      breadcrumbs
    }
  },
  setup () {
    return {}
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
</script>
