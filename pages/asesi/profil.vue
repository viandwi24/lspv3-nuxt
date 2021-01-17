<template>
  <div>
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Profil
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'asesi' },{ text: 'Profil' }]" />
    </div>
    <div class="flex flex-col">
      <div class="card mb-4 w-full">
        <div class="header">
          Umum
        </div>
        <div class="content">
          <tw-input title="Nama" :value.sync="user.name" />
          <tw-input title="E-mail" :value.sync="user.email" />
          <tw-input title="Nomor Telepon" :value.sync="user.phone" />
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
          Nomor Identitas
        </div>
        <div class="content">
          <tw-select title="Tipe Identitas" :value.sync="user.identity_number_type" :data="identityNumberType" />
          <tw-input title="Nomor Identitas" :value.sync="user.identity_number" />
        </div>
      </div>
      <div class="card mb-4 w-full">
        <div class="header">
          Tanda Tangan
        </div>
        <div class="content block lg:flex lg:flex-row lg:gap-3">
          <div>
            <VueSignaturePad ref="signaturePad" width="300px" height="300px" :options="{ backgroundColor: 'white' }" :custom-style="{ border: 'black 3px solid' }" />
          </div>
          <div class="mt-4 lg:mt-0">
            <tw-button type="danger" size="sm" text="Reset" icon="times" @click.native="signatureReset" />
            <tw-button type="warning" size="sm" text="Undo" icon="undo-alt" @click.native="signatureUndo" />
            <tw-button type="success" size="sm" text="Download" icon="file-download" @click.native="signatureDownload" />
          </div>
        </div>
      </div>
      <tw-button class-btn="mx-0 text-center" size="md" text="Simpan" icon="save" @click.native="save" />
    </div>
    <tw-modal name="modal" :title="'Ganti Password'" :options="{}">
      <form>
        <tw-input type="password" title="Password" :value.sync="modalChangePasswordInput.password" />
        <tw-input type="password" title="Re-Password" :value.sync="modalChangePasswordInput.repassword" />
      </form>
      <div slot="footer" slot-scope="props">
        <tw-button text="Simpan" type="primary" icon="save" @click.native="changePassword" />
        <tw-button text="Batal" type="danger" @click.native="props.modal.hide()" />
      </div>
    </tw-modal>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'

export default {
  setup (props, { root, refs }) {
    const user = reactive({ ...root.$store.$auth.user })
    const { save, errorsInput } = useOurGeneralProfile(root, refs, user)
    const { openModalChangePassword, modalChangePasswordInput, changePassword } = useOurChangePassword(root)
    const { signatureReset, signatureUndo, signatureDownload } = useOurSignature(refs)
    const identityNumberType = reactive({
      NIK: 'NIK (Nomor Induk Kependudukan)',
      NIS: 'NIS (Nomor Induk Sekolah)',
      SIM: 'SIM (Nomor Induk Surat Izin Mengemudi)',
      Custom: 'Kustom (Ditentukan Penyelenggara)'
    })
    onMounted(() => {
      refs.signaturePad.fromDataURL(user.signature)
    })
    return {
      user,
      save,
      openModalChangePassword,
      modalChangePasswordInput,
      changePassword,
      errorsInput,
      signatureReset,
      signatureUndo,
      signatureDownload,
      identityNumberType
    }
  },
  computed: {
    firstName () {
      const name = this.$auth.user.name
      return name.split(' ')[0]
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_accession'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Asesi'
  }
}

function useOurGeneralProfile (root, refs, user) {
  let errorsInput = reactive([])
  const save = async () => {
    // signature
    const signatureSave = refs.signaturePad.saveSignature()

    // input
    const input = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      signature: signatureSave.data,
      identity_number_type: user.identity_number_type,
      identity_number: user.identity_number
    }
    root.$overlayLoading.show()
    try {
      const http = await root.$axios.put('auth/user', input)
      if (typeof http.data.status !== 'undefined' && http.data.status === true) {
        root.$swal(
          'Disimpan!',
          'Profil berhasil diperbarui.',
          'success'
        ).then(() => {
          root.$auth.fetchUser()
        })
      }
    } catch (error) {
      const res = error.response.data
      if (typeof res.error_code !== 'undefined' && res.error_code === 'validation.fails') {
        errorsInput = Object.keys(res.errors)
      }
    }
    root.$overlayLoading.hide()
  }

  return {
    save,
    errorsInput
  }
}

function useOurChangePassword (root) {
  const openModalChangePassword = () => root.$modal.show('modal')
  const modalChangePasswordInput = reactive({
    password: '',
    repassword: ''
  })
  const changePassword = async () => {
    const data = {
      password: modalChangePasswordInput.password,
      password_confirmation: modalChangePasswordInput.repassword
    }
    root.$overlayLoading.show()
    try {
      const http = await root.$axios.put('auth/change-password', data)
      if (typeof http.data.status !== 'undefined' && http.data.status === true) {
        root.$swal(
          'Disimpan!',
          'Password berhasil diubah.',
          'success'
        ).then(() => {
          root.$modal.hide('modal')
        })
      }
    } catch (error) {
      // const res = error.response.data
    }
    root.$overlayLoading.hide()
  }

  return {
    openModalChangePassword,
    modalChangePasswordInput,
    changePassword
  }
}

function useOurSignature (refs) {
  const signatureReset = () => refs.signaturePad.clearSignature()
  const signatureUndo = () => refs.signaturePad.undoSignature()
  const signatureDownload = () => {
    const signatureSave = refs.signaturePad.saveSignature()
    const image = signatureSave.data.replace(/^data: image\/[^;]/, 'data:application/octet-stream')
    const link = document.createElement('a')
    link.download = 'my_signature.png'
    link.href = image
    link.click()
  }
  return {
    signatureReset,
    signatureUndo,
    signatureDownload
  }
}
</script>
