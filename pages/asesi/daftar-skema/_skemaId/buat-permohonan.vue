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

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        Pastikan informasi skema berikut sesuai dengan skema yang ingin anda ikuti.
      </p>
    </tw-alert>

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        Formulir ini membutuhkan tanda tangan anda, membuat tanda tangan bisa anda akses melalui Halaman Profil.
      </p>
    </tw-alert>

    <div class="card mb-4 w-full">
      <div class="header">
        Skema
      </div>
      <div class="content">
        <tw-input title="Judul" :value="skema.title" :disabled="true" />
        <tw-input title="Kode" :value="skema.code" :disabled="true" />
        <tw-input title="Deskripsi" :value="skema.description" :disabled="true" />
        <tw-input title="Kategori" :value="skemaCategories.join(', ')" :disabled="true" />
      </div>
    </div>

    <div class="card mb-4 w-full">
      <div class="header">
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
              <th class="text-left">
                Skema
              </th>
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

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        Isi data diri sesuai dengan asli, nama dan email dapat diubah di Halaman Profil,
        harap diingat ketika Formulir di kirim, nama dan email tidak akan bisa diubah.
      </p>
    </tw-alert>

    <div class="card mb-4 w-full">
      <div class="header">
        Data Pribadi
      </div>
      <div class="header text-gray-800">
        <div class="pt-8">
          <p class="text-xl font-semibold">
            Bagian 1 : Rincian Data Pemohon Sertifikasi
          </p>
          <p>
            Pada bagian ini, cantumkan data pribadi, data pendidikan formal yang tepat.
          </p>
        </div>
      </div>
      <div class="content flex flex-col border-gray-400" style="border-bottom-width: 1px;">
        <p class="text-xl font-semibold mb-2">
          A. Data Diri
        </p>
        <div>
          <tw-input title="Nama Lengkap" :value.sync="input.user.name" :disabled="true" />
          <div class="flex fle-row gap-4">
            <tw-input title="Tempat Lahir" :value.sync="input.user.placeOfBirth" class="w-full md:w-1/2" />
            <tw-input title="Waktu Pelaksanaan" type="custom" class="w-full md:w-1/2">
              <date-picker
                v-model="input.user.dateOfBirth"
                placeholder="dd-MM-yyyy"
                format="dd-MM-yyyy"
                input-class="bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-md"
              />
            </tw-input>
          </div>
          <div class="flex fle-row gap-4">
            <tw-select title="Jenis Kelamin" :value.sync="input.user.gender" :data="{ 'Male': 'Pria', 'Female': 'Perempuan' }" class="w-full md:w-1/2" />
            <tw-input title="Kebangsaan" :value.sync="input.user.nationality" class="w-full md:w-1/2" />
          </div>
          <tw-input title="Alamat Rumah" type="textarea" :value.sync="input.user.address" />
          <div class="flex fle-row gap-4">
            <tw-input title="Nomor Telepon" :value.sync="input.user.phone" class="w-full md:w-1/2" />
            <tw-input title="Email" :value.sync="input.user.email" class="w-full md:w-1/2" :disabled="true" />
          </div>
          <tw-input title="Pendidikan Terakhir" :value.sync="input.user.last_education" />
        </div>
      </div>
      <div class="content flex flex-col">
        <p class="text-xl font-semibold mb-2">
          B. Data Pekerjaan Sekarang
        </p>
        <tw-select title="Status" :value.sync="input.job.status" :data="{ 'Working': 'Saya bekerja', 'Not Working': 'Saya tidak bekerja' }" />
        <tw-input title="Nama Perusahaan" :value.sync="input.job.company" :disabled="disableJobInput" />
        <tw-input title="Jabatan" :value.sync="input.job.position" :disabled="disableJobInput" />
        <tw-input title="Alamat Perusahaan" type="textarea" :value.sync="input.job.address" :disabled="disableJobInput" />
        <div class="flex fle-row gap-4">
          <tw-input title="Nomor Telepon" :value.sync="input.job.phone" class="w-full md:w-1/2" :disabled="disableJobInput" />
          <tw-input title="Email" :value.sync="input.job.email" class="w-full md:w-1/2" :disabled="disableJobInput" />
        </div>
      </div>
    </div>

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        Isi tujuan yang sesuai dengan tujuan anda untuk mengikuti asesmen ini.
      </p>
    </tw-alert>

    <div class="card mb-4 w-full">
      <div class="header">
        Sertifikasi
      </div>
      <div class="header text-gray-800">
        <div class="pt-8">
          <p class="text-xl font-semibold">
            Bagian 2 : Data Sertifikasi
          </p>
          <p>
            Tuliskan Judul dan Nomor Skema Sertifikasi, Tujuan Asesmen serta Daftar Unit Kompetensi sesuai
            kemasan pada skema sertifikasi yang anda ajukan untuk mendapatkan pengakuan sesuai dengan
            latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda miliki.
          </p>
        </div>
      </div>
      <div class="content flex flex-col">
        <p class="text-xl font-semibold mb-2">
          A. Sertifikasi
        </p>
        <tw-select title="Status" :value.sync="input.certification.purpose" :data="{ 'Certification': 'Sertifikasi', 'Recertification': 'Sertifikasi Ulang', 'Other': 'Lainnya' }" />
      </div>
    </div>

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        <ul class="list-disc pl-5">
          <li>File yang diupload harus sesuai rule.</li>
          <li>Maksimal Size File adalah 40mb.</li>
          <li>Upload File dilakukan di menu Berkas.</li>
        </ul>
      </p>
    </tw-alert>

    <div class="card mb-4 w-full">
      <div class="header">
        Berkas Persyaratan
      </div>
      <div>
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th width="6%">
                #
              </th>
              <th class="text-left" width="30%">
                Nama
              </th>
              <th class="text-left" width="20%">
                Format
              </th>
              <th class="text-left">
                Pilih Berkas
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in skema.files" :key="i">
              <td class="text-center">
                {{ (i+1) }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.format.join(', ') }}
              </td>
              <td>
                <v-select v-model="input.files[i]" class="vue-select" :options="files" :reduce="file => { return {schema_file: item.id, file: file.id} }" label="name" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card mb-4 w-full">
      <div class="header">
        Berkas Pendukung
        <div class="float-right">
          <tw-button class-btn="mx-0" size="sm" text="Tambah File" @click.native="addNewFile" />
        </div>
      </div>
      <div>
        <table class="table table-sm table-hover mb-0">
          <thead>
            <tr>
              <th width="5%">
                #
              </th>
              <th class="text-left" width="45%">
                Nama
              </th>
              <th>Pilih Berkas</th>
              <th width="5%">
                ...
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="input.otherFile.length == 0">
              <td class="text-center" colspan="4">
                -
              </td>
            </tr>
            <tr v-for="(item, i) in input.otherFile" v-else :key="i">
              <td class="text-center">
                {{ (i+1) }}
              </td>
              <td class="">
                <tw-input size="sm" :with-title="false" :value.sync="input.otherFile[i].name" />
              </td>
              <td class="">
                <v-select v-model="input.otherFile[i].file" class="vue-select" :options="files" :reduce="file => file.id" label="name" />
              </td>
              <td class="">
                <tw-button class-btn="mx-0 mt-1" type="danger" size="sm" icon="times" @click.native="deleteFile(i)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <tw-alert alert="left-accent-border" class="mb-4">
      <p class="font-bold">
        Perhatian!
      </p>
      <p>
        lakukan asesmen mandiri dengan mencentang kolom "bisa" jika sesuai.
      </p>
    </tw-alert>

    <div class="card mb-4 w-full">
      <div class="header">
        Asesmen Mandiri
      </div>
      <div>
        <div v-for="(competency_unit, i) in skema.competency_units" :key="i">
          <table class="table table-sm table-hover mb-0">
            <tr>
              <th colspan="4">
                {{ competency_unit.code }} {{ competency_unit.title }}
              </th>
            </tr>
            <tr>
              <th class="text-left" colspan="2">
                <p class="pl-4">
                  Dapatkah saya?
                </p>
              </th>
              <th class="text-center" width="7%">
                Tidak Bisa
              </th>
              <th class="text-center" width="7%">
                Bisa
              </th>
            </tr>
            <tbody v-for="(work_element, j) in competency_unit.work_elements" :key="j">
              <tr>
                <td colspan="4">
                  <p class="pl-4 font-semibold">
                    {{ work_element.title }}
                  </p>
                </td>
              </tr>
              <tr v-for="(job_criteria, k) in work_element.job_criterias" :key="k">
                <td>
                  <p class="pl-4">
                    {{ `${(j+1)}.${(k+1)}` }}
                  </p>
                </td>
                <td>
                  {{ job_criteria.title }}
                </td>
                <td class="text-center">
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio assessmen-radio h-4 w-4" :name="`radio-${i}${j}${k}`">
                  </label>
                </td>
                <td class="text-center">
                  <label class="inline-flex items-center">
                    <input type="radio" class="form-radio assessmen-radio setuju h-4 w-4" :name="`radio-${i}${j}${k}`" checked>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <table v-for="(work_element, j) in competency_unit.work_elements" :key="j" class="table table-sm table-hover mb-0">
            <tr>
              <td colspan="4">
                <p class="pl-4">
                  {{ (j+1) }}. {{ work_element.title }}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="pl-4">
                  1.1
                </p>
              </td>
              <td>Menggunakan Daftar kebutuhan yang telah ditentukan.</td>
              <td class="text-center">
                ...
              </td>
              <td class="text-center">
                ...
              </td>
            </tr>
          </table> -->
        </div>
      </div>
    </div>

    <tw-button class-btn="mx-0 text-center w-full" size="md" text="Kirim Permohonan" icon="upload" @click.native="save" />
  </div>
</template>

<script>
import { computed, reactive, useContext } from '@nuxtjs/composition-api'
import { useOurAsyncDataSlugId } from '@/api/accession/schema.js'
import { useOurCrudSRegistrationSchema } from '@/api/accession/registration-schema.js'
import { useOurCrudFile } from '@/api/accession/file.js'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.skemaId)
  },
  async asyncData ({ params, app, redirect }) {
    const { skema } = await useOurAsyncDataSlugId(params, app, redirect)
    const { readAll } = useOurCrudFile(app)
    const { files } = await readAll()
    const skemaCategories = []
    skema.categories.forEach(e => skemaCategories.push(e.name))
    return {
      skema,
      files,
      skemaCategories
    }
  },
  setup (props, { root }) {
    const { $auth } = useContext()
    const { tableOptions } = useOurTable()
    const { create } = useOurCrudSRegistrationSchema(root)
    const input = reactive({
      user: {
        name: $auth.user.name,
        placeOfBirth: 'Surabaya',
        dateOfBirth: null,
        gender: 'Male',
        address: 'mojokerto sini',
        nationality: 'Indonesia',
        phone: '0895337617550',
        email: $auth.user.email,
        last_education: 'SMK'
      },
      job: {
        status: 'Working',
        company: 'Gojek',
        position: 'Bussiness Manager',
        address: 'jakarta sana',
        phone: '0895337617550',
        email: 'admin@gojek.id'
      },
      certification: {
        purpose: 'Certification'
      },
      files: [
        { schema_file: 1, file: 1 },
        { schema_file: 2, file: 1 },
        { schema_file: 3, file: 1 }
      ],
      otherFile: [{ name: 'test aja', file: 1 }]
    })
    const disableJobInput = computed(function () {
      const jobstatus = input.job.status
      return jobstatus !== 'Working'
    })
    const save = () => {
      root.$swal({
        title: 'Apakah kamu yakin?',
        text: 'Yakin ingin membuat permohonan terhadap skema ini?',
        icon: 'warning',
        showCancelButton: true
      }).then(function () {
        // validation - asesmen mandiri
        const asesmenSetujuRadio = document.querySelectorAll('.form-radio.assessmen-radio.setuju')
        for (let i = 0; i < asesmenSetujuRadio.length; i++) {
          const e = asesmenSetujuRadio[i]
          if (!e.checked) {
            root.$swal({
              title: 'Tidak dapat mengirim!',
              text: 'Ada Asesmen Mandiri yang mana ada unit yang kamu tidak bisa, kamu harus mengisi bisa sebelum mengirim permohonan ini!',
              icon: 'error'
            })
          }
        }

        // validation input
        const data = Object.assign(JSON.parse(JSON.stringify(input)), {})
        data.user.dateOfBirth = root.$moment(data.user.dateOfBirth).format('DD-MM-YYYY')
        data.job.status = (data.job.status === 'Working')
        console.log(data)

        // send
        root.$overlayLoading.show()
        create(data).then((res) => {
          if (res.status === 201) {
            root.$swal(
              'Terkirim!',
              'Permohonan anda berhasil dikirim, silahkan pantau status permohonan anda apakah sudah diterima atau masih proses (pending).',
              'success'
            ).then(() => {
              root.$router.push({ name: 'asesi-daftar-skema' })
            })
          }
        }).finally(() => {
          root.$overlayLoading.hide()
        })
      })
    }
    const addNewFile = () => {
      input.otherFile.push({
        name: '',
        file: undefined
      })
    }

    return {
      addNewFile,
      save,
      input,
      disableJobInput,
      tableOptions
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_accession'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Asesi - Buat Permohonan'
  }
}

function useOurTable (url) {
  const tableOptions = reactive({
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

<style lang="scss">
</style>
