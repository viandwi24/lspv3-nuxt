export const url = (schemaId) => {
  return `admin/schemas/${schemaId}/schedules`
}

export function useOurCrudSchedule (schemaId, $root) {
  const url = `admin/schemas/${schemaId}/schedules`

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
    destroy
  }
}
