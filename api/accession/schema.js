export const url = 'accession/schemas'

export function useOurCrudSchema ($root) {
  const read = async (id) => {
    return (await $root.$axios.$get(`${url}/${id}`))
  }

  return {
    read
  }
}
export async function useOurAsyncDataSlugId (params, app, redirect) {
  const { read } = useOurCrudSchema(app)
  const id = params.skemaId
  let skema

  app.$overlayLoading.show()
  try {
    skema = (await read(id)).data
  } catch (error) {
    await redirect({ name: 'asesi-daftar-skema' })
  }
  await app.$sleep(100)
  app.$overlayLoading.hide()

  return {
    skema
  }
}
