function safeUrl () {
  const baseurl = process.env.API_BASE_URL
  const prefix = process.env.API_PREFIX
  return baseurl + '/' + prefix
}

export default function ({ $axios, redirect, app }) {
  $axios.setBaseURL(
    safeUrl()
  )
  $axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    const res = error.response
    app.context.$toast.clear()
    if (res.status === 422 && res.data && res.data.error_code === 'auth.login.validation' && res.data.errors) {
      Object.entries(res.data.errors).forEach(([input, errors]) => {
        // this.error[input] = true
        app.context.$toast.error(errors[0], { duration: 5000 })
      })
    } else if (res.data && res.data.error_code) {
      app.context.$toast.error(`Error on process request. (${res.data.error_code})`, { duration: 5000 })
    } else {
      app.context.$toast.error('Error on process request, try again later. (unknown error)', { duration: 5000 })
      if (process.env.NODE_ENV !== 'production') { console.log(res) }
    }
    return Promise.reject(error)
  })
}
