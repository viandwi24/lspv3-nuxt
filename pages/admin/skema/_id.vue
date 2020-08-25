<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Skema
        <icon icon="chevron-right" class="text-3xl" />
        {{ (skema.title) }}
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <div class="content-section">
        <hr class="hr-text" data-content="Umum">
        <div class="block md:flex md:flex-row md:space-x-2">
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="cogs" />
              </div>
              <div class="flex-1 self-center pl-4">
                Pengaturan Skema
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="user-check" />
              </div>
              <div class="flex-1 self-center pl-4">
                Manajemen Asesor
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="building" />
              </div>
              <div class="flex-1 self-center pl-4">
                Manajemen Tempat Uji
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="clock" />
              </div>
              <div class="flex-1 self-center pl-4">
                Manajemen Jadwal
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-section mt-6">
        <hr class="hr-text" data-content="Asesmen">
        <div class="block md:flex md:flex-row md:space-x-2">
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="user-check" />
              </div>
              <div class="flex-1 self-center pl-4">
                Permohonan Asesi
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="user-edit" />
              </div>
              <div class="flex-1 self-center pl-4">
                Semua Asesi & Asesmen
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-section mt-6">
        <hr class="hr-text" data-content="Formulir">
        <div class="block md:flex md:flex-row md:space-x-2">
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="list-alt" />
              </div>
              <div class="flex-1 self-center pl-4">
                Manajemen Formulir
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-section mt-6">
        <hr class="hr-text" data-content="Fitur Lainnya">
        <div class="block md:flex md:flex-row md:space-x-2">
          <div class="w-full md:w-1/4 my-2">
            <div class="widget-icon text-center sm:text-left">
              <div class="text-6xl">
                <icon icon="pen-alt" />
              </div>
              <div class="flex-1 self-center pl-4">
                Pertanyaan Tertulis
              </div>
            </div>
          </div>
        </div>
      </div>
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
    const limitStr = (str, max) => {
      if (str.length > max) { str = str.substring(0, max) + '...' }
      return str
    }
    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: limitStr(skema.title, 50) } //, route: { name: 'admin-skema-id', params: { id } }
    ]

    return {
      id,
      skema,
      breadcrumbs
    }
  },
  setup () {
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
