export const getDashboardRoute = () => {
  console.log(
    this
  )
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const limitStr = (str, max) => {
  if (str.length > max) { str = str.substring(0, max) + '...' }
  return str
}

export default ({ app }, inject) => {
  inject('getDashboardRoute', getDashboardRoute)
  inject('sleep', sleep)
  inject('overlayLoading', {
    show: () => {
      app.store.commit('SET_LOADING', true)
    },
    hide: () => {
      app.store.commit('SET_LOADING', false)
    }
  })
  inject('limitStr', limitStr)
}
