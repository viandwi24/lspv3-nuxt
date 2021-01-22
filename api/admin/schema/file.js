function generateUrl (schemaId) {
  return `admin/schemas/${schemaId}/files`
}

export const url = generateUrl

export function useOurCrudSchemaFile (schemaId, $root) {
  const url = generateUrl(schemaId)

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
    update,
    destroy
  }
}
