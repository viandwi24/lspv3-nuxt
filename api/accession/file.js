export const url = 'accession/files'

export function useOurCrudFile ($root) {
  const options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const create = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const response = $root.$axios.post(url, data, options)
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
    url,
    create,
    read,
    update,
    destroy
  }
}
