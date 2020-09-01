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
    // check auth
    if (res.status && res.status === 401) {
      if (app.context.route.name === 'auth-login' && res.data && res.data.error_code === 'auth.login.attempt') {
        app.context.$toast.error('Email atau Kata sandi salah.', { duration: 5000 })
      } else {
        app.context.$toast.error('Unauthorized...', { duration: 5000 })
        app.context.$auth.logout()
      }
    } else {
      // alert
      app.context.$toast.clear()
      if (res.status && res.status === 422 && res.data && res.data.error_code === 'validation.fails' && res.data.errors) {
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
      // return error
    }
    // return
    return Promise.reject(error)
  })
}
