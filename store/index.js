export const state = () => ({
  app: {},
  loading: false,
  theme: 'light'
})

export const mutations = {
  SET_APP (state, app) {
    state.app = app
  },
  SET_LOADING (state, isLoading) {
    state.loading = isLoading
  },
  SET_THEME (state, name) {
    state.theme = name
    localStorage.setItem('theme', name)
  }
}

export const actions = {
  async nuxtServerInit ({ commit, state }, context) {
    // set app info from server
    const app = await context.app.$axios.$get('/')
    commit('SET_APP', app)
  }
}

export const getters = {
  GET_APP (state) {
    return state.app
  }
}
