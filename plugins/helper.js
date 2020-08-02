export const getDashboardRoute = () => {
  console.log(
    this
  )
}

export default ({ app }, inject) => {
  inject('getDashboardRoute', getDashboardRoute)
}
