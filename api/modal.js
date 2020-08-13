import { reactive, ref } from '@vue/composition-api'

export function useOurTableActionModal ($root, $refs, title, crud, initInput = [], rowPrimary = 'id') {
  // build dynamic input
  const dynamicInput = reactive({
    inputState: {}
  })
  const buildDynamicInput = () => {
    initInput.forEach((val) => {
      if (typeof val === 'object') {
        dynamicInput.inputState[val[0]] = val[1]
      } else {
        dynamicInput.inputState[val] = ''
      }
    })
  }
  buildDynamicInput()

  // state
  const mode = ref('create')
  const input = ref({ ...dynamicInput.inputState })

  const closeModalRefreshTable = () => {
    $refs.table.load()
    $root.$modal.hide('modal')
  }

  const modalDelete = (data) => {
    confirmDelete(
      `Kamu akan menghapus ${title} dengan ${rowPrimary} "${data.row[rowPrimary]}"`
    ).then((result) => {
      if (result.value) {
        deleteData([data.row.id])
      }
    })
  }

  const confirmDelete = (text) => {
    return $root.$swal({
      title: 'Apakah kamu yakin?',
      text,
      icon: 'warning',
      showCancelButton: true
    })
  }

  const modalBulkDelete = (data) => {
    const selected = $refs.table.selectedRows
    const ids = []
    for (const i in selected) {
      ids.push(selected[i].id)
    }
    confirmDelete(
      `Kamu akan menghapus ${title} dengan id "${(ids)}"`
    ).then((result) => {
      if (result.value) {
        deleteData(ids)
      }
    })
  }

  const deleteData = async (data) => {
    $root.$overlayLoading.show()
    await $root.$sleep(500)
    crud.destroy(data).then((res) => {
      $root.$swal(
        'Terhapus!',
        'Item yang terpilih berhasil dihapus.',
        'success'
      ).then(() => {
        closeModalRefreshTable()
      })
    }).finally(() => $root.$overlayLoading.hide())
  }

  const modalSave = async (data) => {
    // create
    $root.$overlayLoading.show()
    await $root.$sleep(500)
    if (mode.value === 'create') {
      crud.create(input.value).then((res) => {
        if (res.status === 201) {
          $root.$swal(
            'Ditambahkan!',
            'Item yang dibuat berhasil ditambahkan.',
            'success'
          ).then(() => {
            closeModalRefreshTable()
          })
        }
      }).finally(() => $root.$overlayLoading.hide())

    // update
    } else if (mode.value === 'edit') {
      crud.update(input.value).then((res) => {
        $root.$swal(
          'Diperbarui!',
          'Item yang diedit berhasil diperbarui.',
          'success'
        ).then(() => {
          closeModalRefreshTable()
        })
      }).finally(() => $root.$overlayLoading.hide())
    }
  }

  const modalOpen = (openMode = 'create', data = {}) => {
    // handle mode
    mode.value = openMode
    initInput.forEach((val) => {
      if (typeof val === 'object') {
        input.value[val[0]] = Object.assign({}, val[1])[val[0]]
      } else {
        input.value[val] = ''
      }
    })
    // console.log(input)
    if (mode.value === 'edit') {
      // fix bug
      modalOpen('create', {})
      $root.$sleep(50)
      $root.$modal.hide('modal')
      $root.$sleep(50)
      mode.value = 'edit'

      // source data asli dari Vue Good Table :
      const row = data.row

      // dynamic input
      initInput.forEach((val) => {
        if (typeof val === 'object') {
          // clone object agar tidak me-reference ke source aslinya
          let newVal = Object.assign({}, row)[val[0]]
          if (Array.isArray(newVal)) {
            newVal = [...newVal]
          } else if (typeof newVal === 'object') {
            newVal = Object.assign({}, newVal)
          }
          input.value[val[0]] = newVal
        } else {
          input.value[val] = Object.assign({}, row)[val]
        }
      })
      // nah ketika melakukan pengubahan data input, "data.row" ikutan berubah :
      // input.value.push('tes')
      console.log(row)
    } else if (mode.value === 'create') {
    }

    // show modal
    $root.$modal.show('modal')
  }

  return {
    mode,
    input,
    modalOpen,
    modalSave,
    modalDelete,
    modalBulkDelete
  }
}
