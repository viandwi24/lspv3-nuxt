<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Pengaturan Skema
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <h1>Tes</h1>
    </div>
  </div>
</template>

<script>
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } }
    ]

    return {
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
      title: `Dashboard - Admin - Skema - ${this.skema.title}`
    }
  }
}
</script>
