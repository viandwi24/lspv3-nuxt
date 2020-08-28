export const url = (schemaId, competencyUnitId) => {
  return `admin/schemas/${schemaId}/competency-units/${competencyUnitId}/work-elements`
}

export function useOurCrudElemen (schemaId, competencyUnitId, $root) {
  const baseurl = url(schemaId, competencyUnitId)

  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.post(`${baseurl}`, data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const read = async (id) => {
    return (await $root.$axios.$get(`${baseurl}/${id}`))
  }

  const update = (data) => {
    const { id } = data
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.put(`${baseurl}/${id}`, data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const destroy = (data) => {
    const id = data.join(',')
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.delete(`${baseurl}/${id}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  return {
    create,
    read,
    update,
    destroy
  }
}

export async function useOurAsyncDataSlugId (params, app, redirect) {
  const { skemaId, unitKompetensiId, elemenId } = params
  const { read } = useOurCrudElemen(skemaId, unitKompetensiId, app)
  let elemen

  app.$overlayLoading.show()
  try {
    elemen = (await read(elemenId)).data
  } catch (error) {
    await redirect({
      name: 'admin-skema-skemaId-manajemen-unit-kompetensi-unitKompetensiId-elemen',
      params: {
        skemaId,
        unitKompetensiId
      }
    })
  }
  await app.$sleep(100)
  app.$overlayLoading.hide()

  return {
    elemen
  }
}
