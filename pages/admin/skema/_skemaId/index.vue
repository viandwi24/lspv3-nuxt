<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        {{ (skema.title) }}
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="content">
      <div v-for="(menu, i) in menuItems" :key="i" class="content-section mb-6">
        <hr class="hr-text" :data-content="menu.title">
        <div class="block sm:block md:flex md:flex-row md:flex-shrink md:flex-wrap md:-mx-2 sm:-mx-1">
          <div v-for="(item, j) in menu.items" :key="j" class="w-full md:w-1/4 sm:w-1/2 px-2 py-2">
            <nuxt-link :to="{ name: `admin-skema-skemaId-${item.route}` }" :title="item.text">
              <div class="widget-icon text-center sm:text-left">
                <div class="text-6xl block sm:text-lg md:text-2xl lg:text-6xl">
                  <icon :icon="item.icon" />
                </div>
                <div class="flex-1 self-center pl-4" style="overflow: hidden; text-overflow: ellipsis;">
                  {{ item.text }}
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- <div class="content-section mt-6">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { useOurAsyncDataSlugId } from '@/api/admin/schema.js'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.skemaId)
  },
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50) } //, route: { name: 'admin-skema-id', params: { id } }
    ]

    return {
      skema,
      breadcrumbs
    }
  },
  setup (props, context) {
    const menuItems = [
      {
        title: 'Manajemen & Umum',
        items: [
          { text: 'Unit Kompetensi', icon: 'list-alt', route: 'manajemen-unit-kompetensi' },
          { text: 'Asesor', icon: 'user-friends', route: 'manajemen-asesor' },
          { text: 'Tempat Uji', icon: 'building', route: 'manajemen-tempat-uji' },
          { text: 'Jadwal', icon: 'calendar-alt', route: 'manajemen-jadwal' },
          { text: 'Pengaturan', icon: 'cogs', route: 'pengaturan' }
        ]
      },
      {
        title: 'Asesmen & Asesi',
        items: [
          { text: 'Permohonan Asesi', icon: 'user-check', route: 'manajemen-unit-kompetensi' },
          { text: 'Asesmen Asesi', icon: 'user-edit', route: 'manajemen-unit-kompetensi' }
        ]
      },
      {
        title: 'Formulir & Fitur Asesmen',
        items: [
          { text: 'Manajemen Formulir', icon: 'clipboard-list', route: 'manajemen-unit-kompetensi' },
          { text: 'Pertanyaan Tertulis (cbt)', icon: 'scroll', route: 'manajemen-unit-kompetensi' }
        ]
      },
      {
        title: 'Alat',
        items: [
          { text: 'Pengganti Tanggal', icon: 'calendar-day', route: 'manajemen-unit-kompetensi' }
        ]
      }
    ]

    return {
      menuItems
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
