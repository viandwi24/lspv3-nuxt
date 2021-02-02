<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Permohonan Asesi
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="flex flex-col">
      a
    </div>
  </div>
</template>

<script>
import { useOurAsyncDataSlugId as useOurSchemaAsyncDataSlugId } from '@/api/admin/schema.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurSchemaAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Permohonan Asesi' }
    ]

    return {
      skema,
      breadcrumbs
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head () {
    return {
      title: `Dashboard - Admin - Skema - ${this.skema.title} - Permohonan`
    }
  }
}
</script>
