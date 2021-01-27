export const url = 'accession/registration-schemas'

export function useOurCrudSRegistrationSchema ($root) {
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

  return {
    create
  }
}
