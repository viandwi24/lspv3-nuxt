export const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.$auth.loginWith('local', { data })
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }
}
