export const url = 'admin/schemas'

export function useOurCrudSchema ($root) {
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
