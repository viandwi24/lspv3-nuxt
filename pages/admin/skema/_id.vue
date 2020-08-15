<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        {{ skema.title }}
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
  </div>
</template>

<script>
import { useOurCrudSchema } from '@/api/admin/schema.js'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ params, app, redirect }) {
    const { read } = useOurCrudSchema(app)
    const id = params.id
    let skema

    app.$overlayLoading.show()
    try {
      skema = (await read(id)).data
    } catch (error) {
      await redirect({ name: 'admin-skema' })
    }
    await app.$sleep(500)
    app.$overlayLoading.hide()

    // bc
    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: skema.title } //, route: { name: 'admin-skema-id', params: { id } }
    ]

    return {
      id,
      skema,
      breadcrumbs
    }
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
