import { reactive } from '@vue/composition-api'

export function useOurTableActionModal ($root, $refs, title, crud, input = [], rowPrimary = 'id') {
  // build dynamic input
  const dynamicInput = reactive({
    inputState: {}
  })
  const buildDynamicInput = () => {
    input.forEach((val) => {
      dynamicInput.inputState[val] = ''
    })
  }
  buildDynamicInput()

  // state
  const modalOptions = reactive({
    mode: 'create',
    input: dynamicInput.inputState
  })

  const closeModalRefreshTable = () => {
    $refs.table.load()
    $root.$modal.hide('modal')
  }

  const deleteModal = (data) => {
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

  const bulkDeleteModal = (data) => {
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

  const saveModal = async (data) => {
    const mode = modalOptions.mode
    const input = modalOptions.input

    // create
    $root.$overlayLoading.show()
    await $root.$sleep(500)
    if (mode === 'create') {
      crud.create(input).then((res) => {
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
    } else if (mode === 'edit') {
      crud.update(input).then((res) => {
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

  const openModal = (mode = 'create', data = {}) => {
    // handle mode
    modalOptions.mode = mode
    input.forEach((val) => {
      modalOptions.input[val] = ''
    })
    if (mode === 'edit') {
      // fix bug
      openModal('create', {})
      $root.$sleep(50)
      $root.$modal.hide('modal')
      $root.$sleep(50)
      modalOptions.mode = 'edit'

      // dynamic input
      input.forEach((val) => {
        modalOptions.input[val] = { ...data.row }[val]
      })
    } else if (mode === 'create') {
    }

    // show modal
    $root.$modal.show('modal')
  }

  return {
    modalOptions,
    openModal,
    saveModal,
    deleteModal,
    bulkDeleteModal
  }
}
