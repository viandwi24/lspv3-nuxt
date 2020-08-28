export const url = (schemaId) => {
  return `admin/schemas/${schemaId}/competency-units`
}

export function useOurCrudUnitKompetensi (schemaId, $root) {
  const url = `admin/schemas/${schemaId}/competency-units`

  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.post(`${url}`, data)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  const read = async (id) => {
    return (await $root.$axios.$get(`${url}/${id}`))
  }

  const update = (data) => {
    const { id } = data
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.put(`${url}/${id}`, data)
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
        const response = $root.$axios.delete(`${url}/${id}`)
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
  const { skemaId, unitKompetensiId } = params
  const { read } = useOurCrudUnitKompetensi(skemaId, app)
  let unitKompetensi

  app.$overlayLoading.show()
  try {
    unitKompetensi = (await read(unitKompetensiId)).data
  } catch (error) {
    await redirect({ name: 'admin-skema-skemaId-manajemen-unit-kompetensi' })
  }
  await app.$sleep(100)
  app.$overlayLoading.hide()

  return {
    unitKompetensi
  }
}
