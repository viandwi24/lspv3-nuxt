export const url = (schemaId, competencyUnitId, workElementId) => {
  return `admin/schemas/${schemaId}/competency-units/${competencyUnitId}/work-elements/${workElementId}/job-criterias`
}

export function useOurCrudJobCriteria (schemaId, competencyUnitId, workElementId, $root) {
  const baseurl = url(schemaId, competencyUnitId, workElementId)

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
