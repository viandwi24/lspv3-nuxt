<template>
  <div class="flex flex-row-reverse flex-grow min-h-screen max-h-screen overflow-hidden">
    <div class="flex-1 bg-blue-400 max-h-full relative">
      <img src="@/assets/images/illustration/exam.svg" alt="Illustration" class="h-100 absolute">
    </div>
    <div class="login-card bg-gray-100 shadow-2xl px-4 py-6 max-h-full min-h-full overflow-y-auto">
      <div class="container mx-auto px-2 md:px-6">
        <nuxt-link to="/" tag="a" class="text-sm text-blue-500">
          <icon icon="arrow-left" />
          Kembali ke Beranda
        </nuxt-link>

        <h1 class="font-semibold text-3xl text-blue-500 my-10">
          {{ app.name.toUpperCase() }}<br> {{ app.institute.toUpperCase() }}
        </h1>

        <h3 class="text-blue-500 text-lg font-bold">
          LOGIN
        </h3>
        <p class="text-blue-500 mb-10">
          Masuk menggunakan akun yang sudah terdaftar oleh
          admin {{ app.name.toUpperCase() }} {{ app.institute.toUpperCase() }}
        </p>

        <form action="#" autocomplete="off" novalidate="">
          <div class="mb-4 shadow-md">
            <div class="relative form-group">
              <input v-model="auth.email" name="email" type="email" placeholder="example@email.com" :class="{'has-error': error.email === true}">
              <label>Email</label>
            </div>
            <div class="relative form-group">
              <input v-model="auth.password" name="password" type="password" placeholder="password" :class="{'has-error': error.password === true}">
              <label>Password</label>
            </div>
          </div>
          <div class="my-8">
            <div class="mt-4 flex justify-between">
              <div>
                <a href="#" class="bg-blue-500 text-gray-100 rounded px-4 py-2 font-semibold transition-all duration-200 ease-in hover:bg-blue-700 hover:text-gray-300" @click.prevent="login">
                  Masuk
                </a>
                <nuxt-link to="/auth/register" tag="a" class="bg-gray-300 text-gray-700 rounded px-4 py-2 font-semibold transition-all duration-200 ease-in hover:bg-gray-400 hover:text-gray-800 ml-2">
                  Daftar
                </nuxt-link>
              </div>
              <a class="text-xs text-blue-500" href="/lupa-password">Lupa password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { computed, reactive } from '@vue/composition-api'
export default {
  setup (props, { root }) {
    const { auth, error, app, login, errorLogin, sleep } = useOurLogin(root)
    return {
      auth,
      error,
      app,
      login,
      errorLogin,
      sleep
    }
  },
  head: {
    title: 'Login'
  },
  middleware: 'guest',
  transition: 'default'
}

function useOurLogin ($this) {
  const auth = reactive({ email: 'viandwicyber@gmail.com', password: 'password' })
  let error = reactive({ email: false, password: false })
  const app = computed(() => $this.$store.state.app)

  const login = async () => {
    const data = auth
    error = { email: false, password: false }
    $this.$toast.clear()
    $this.$toast.show('Logging in...', { duration: 5000 })
    $this.$store.commit('SET_LOADING', true)
    await sleep(2000)
    $this.$store.dispatch('user/login', data).then((res) => {
      $this.$toast.clear()
      $this.$toast.success('Login Succes. Navigating to dashboard...', { duration: 5000 })
      $this.$router.push('/')
    }).catch((err) => {
      errorLogin(err.response)
    }).finally(() => {
      $this.$store.commit('SET_LOADING', false)
    })
  }
  const errorLogin = (res) => {
    if (res.status && res.status === 422 && res.data && res.data.error_code === 'auth.login.validation' && res.data.errors) {
      Object.entries(res.data.errors).forEach(([input, errors]) => {
        error[input] = true
      })
    } else if (res.data && res.data.error_code === 'auth.login.attempt') {
      error = {
        email: true,
        password: true
      }
    }
  }
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  return {
    auth,
    error,
    app,
    login,
    errorLogin,
    sleep
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 512px) {
  .login-card {
    width: 100%;
    max-width: 384px;
  }
}
img {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

form {
  .form-group {
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(239, 238, 237);
    border-image: initial;

    input {
      height: 49px;
      width: 100%;
      font-size: 14px;
      color: rgb(40, 128, 206);
      padding: 22px 1rem 5px;
      outline: none;

      &:active, &:focus {
        border-left: 6px solid rgb(40, 128, 206);
        padding: 22px .7rem 5px;
      }
    }

    input.has-error {
      border-left: 6px solid rgb(206, 40, 62);
      padding: 22px .75rem 5px;
    }

    label {
      position: absolute;
      top: 5px;
      left: 1rem;
      margin-bottom: 0px;
      pointer-events: none;
      cursor: text;
      padding-bottom: 0px;
      font-size: 12px;
      font-weight: 500;
      color: rgb(83, 83, 83);
      transition: all 0.2s ease-in-out 0s;
    }
  }
}
</style>
