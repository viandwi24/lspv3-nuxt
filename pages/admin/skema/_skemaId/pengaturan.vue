<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Pengaturan Skema
      </h1>
      <tw-breadcrumb :items="breadcrumbs" />
    </div>
    <div class="flex flex-col">
      <div class="card mb-4 w-full">
        <div class="header">
          Umum
        </div>
        <div class="content">
          <tw-input title="Judul" :value.sync="input.title" />
          <tw-input title="Kode" :value.sync="input.code" />
          <tw-input title="Deskripsi" :value.sync="input.description" />
          <tw-select title="Status" :value.sync="input.status" :data="{ 'Active': 'Aktif', 'Nonactive': 'Tidak Aktif' }" />
          <div class="input-group">
            <label>Kategori</label>
            <v-select v-model="input.categories" class="vue-select" :multiple="true" :options="categories" />
          </div>
        </div>
      </div>
      <tw-button class-btn="mx-0 text-center" size="md" text="Simpan" icon="save" @click.native="save" />
    </div>
  </div>
</template>

<script>
import { useOurAsyncDataSlugId, url as schemaUrl } from '@/api/admin/schema.js'
import { url as categoryUrl } from '@/api/admin/category.js'
export default {
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)
    const httpCategories = await app.$axios.get(categoryUrl)
    const categories = []
    httpCategories.data.data.forEach((e) => {
      categories.push({
        label: e.name,
        code: e.id
      })
    })

    const breadcrumbs = [
      { text: 'Home', route: 'admin' },
      { text: 'Skema', route: 'admin-skema' },
      { text: app.$limitStr(skema.title, 50), route: { name: 'admin-skema-skemaId', params: { skemaId: skema.id } } },
      { text: 'Pengaturan' }
    ]

    return {
      skema,
      breadcrumbs,
      categories
    }
  },
  data () {
    return {
      input: {
        title: '',
        code: '',
        description: '',
        status: '',
        categories: []
      }
    }
  },
  created () {
    const categories = []
    for (let i = 0; i < this.skema.categories.length; i++) {
      const category = this.skema.categories[i]
      categories.push({
        code: category.id,
        label: category.name
      })
    }
    this.input = {
      title: this.skema.title,
      code: this.skema.code,
      description: this.skema.description,
      status: this.skema.status,
      categories
    }
  },
  methods: {
    async save () {
      try {
        this.$overlayLoading.show()
        const input = {
          title: this.input.title,
          code: this.input.code,
          description: this.input.description,
          status: this.input.status,
          categories: []
        }
        this.input.categories.forEach((e) => {
          input.categories.push(e.code)
        })
        const http = await this.$axios.put(`${schemaUrl}/${this.skema.id}`, input)
        if (typeof http.data.status !== 'undefined' && http.data.status === true) {
          this.$swal(
            'Disimpan!',
            'Pengaturan berhasil diperbarui.',
            'success'
          )
        }
      } catch (error) {
        const res = error.response.data
        if (typeof res.error_code !== 'undefined' && res.error_code === 'validation.fails') {
        }
      }
      this.$overlayLoading.hide()
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
