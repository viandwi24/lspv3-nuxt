<template>
  <div>
    <input
      id="file"
      ref="file"
      type="file"
      name="file"
      style="display: none;"
      @change="fileOnChange"
    >
    <div class="content-header">
      <h1 class="text-4xl text-gray-800">
        Berkas
      </h1>
      <tw-breadcrumb :items="[{ text: 'Home', route: 'asesi' },{ text: 'Berkas' }]" />
    </div>
    <div class="shadow-xl">
      <tw-table ref="table" :options="tableOptions">
        <div slot="selected-row-actions">
          <tw-button text="Hapus Item" type="danger" size="xs" icon="trash-alt" @click.native="modalBulkDelete" />
        </div>
        <div slot="table-actions">
          <tw-button
            class-text="hidden sm:inline"
            type="success"
            size="sm"
            icon="plus"
            text="Unggah File"
            @click.native="fileModalOpen"
          />
        </div>
        <div slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'action'">
            <tw-button
              class-btn="mx-0"
              type="success"
              size="xs"
              icon="file-download"
              title="Unduh"
              @click.native="downloadFile(props)"
            />
            <tw-button
              class-btn="mx-0"
              type="danger"
              size="xs"
              icon="trash-alt"
              title="Hapus"
              @click.native="modalDelete(props)"
            />
          </div>
          <div v-else-if="props.column.field == 'size'">
            {{ formatSize(props.formattedRow[props.column.field]) }}
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </div>
      </tw-table>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { useOurTableActionModal } from '@/api/modal.js'
import { url, useOurCrudFile } from '@/api/accession/file.js'
export default {
  setup (props, { root, refs }) {
    const { tableOptions, formatSize } = useOurTable(url)
    const { create, destroy } = useOurCrudFile(root)
    const {
      modalDelete,
      modalBulkDelete
    } = useOurTableActionModal(root, refs, 'file', { destroy }, [])
    let file = null
    const fileModalOpen = () => {
      refs.file.click()
    }
    const uploadFile = async () => {
      const formData = new FormData()
      formData.append('file', file)

      try {
        await create(formData)
        refs.table.load()
      } catch (error) {
      }
    }
    const fileOnChange = async () => {
      if (refs.file.files.length > 0) {
        file = refs.file.files[0]
      }
      if (typeof file !== 'undefined' && file !== '') {
        await uploadFile()
        refs.file.value = ''
        file = null
      }
    }
    const downloadFile = (props) => {
      const { id, name } = props.row
      root.$axios({
        url: `${url}/${id}`,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', name)
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    }

    return {
      formatSize,
      tableOptions,
      fileModalOpen,
      uploadFile,
      downloadFile,
      fileOnChange,
      modalDelete,
      modalBulkDelete
    }
  },
  layout: 'dashboard',
  middleware: ['auth', 'is_accession'],
  transition: 'dashboard',
  head: {
    title: 'Dashboard - Asesi - Berkas'
  }
}

function useOurTable (url) {
  const tableOptions = reactive({
    url,
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
        label: 'File',
        field: 'name',
        searchable: true,
        sortable: true
      },
      {
        label: 'Tipe',
        field: 'type',
        searchable: true,
        sortable: true
      },
      {
        label: 'Ukuran',
        field: 'size',
        searchable: false,
        sortable: true
      },
      {
        label: 'Actions',
        field: 'action',
        searchable: false,
        sortable: false
      }
    ]
  })

  const formatSize = (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B'
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    do {
      bytes /= thresh
      ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)
    return bytes.toFixed(dp) + ' ' + units[u]
  }

  return {
    formatSize,
    tableOptions
  }
}
</script>
