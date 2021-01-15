<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Profil
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'admin' },{ text: 'Profil' }]" />
    </div>
    <div class="flex flex-col">
      <div class="card mb-4 w-full">
        <div class="header">
          Umum
        </div>
        <div class="content">
          <tw-input title="Nama" :value.sync="user.name" />
          <tw-input title="Email" :value.sync="user.email" />
          <div class="text-right">
            <tw-button
              class-btn="mx-0"
              type="warning"
              size="md"
              text="Ganti Password"
              icon="eye"
              @click.native="openModalChangePassword"
            />
          </div>
        </div>
      </div>
      <div class="card mb-4 w-full">
        <div class="header">
          Admin
        </div>
        <div class="content">
          <tw-input title="NIK" />
        </div>
      </div>
      <tw-button class-btn="mx-0 text-center" size="md" text="Simpan" icon="save" />
    </div>
    <tw-modal name="modal" :title="'Ganti Password'" :options="{}">
      <form>
        <tw-input type="password" title="Password" />
        <tw-input type="password" title="Re-Password" />
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  setup (props, { root }) {
    const user = reactive({ ...root.$store.$auth.user })
    const openModalChangePassword = () => root.$modal.show('modal')
    return {
      user,
      openModalChangePassword
    }
  },
  computed: {
    firstName () {
      const name = this.$auth.user.name
      return name.split(' ')[0]
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Admin'
  }
}
</script>
