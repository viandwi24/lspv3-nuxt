export const state = () => ({
  app: {}
})

export const mutations = {
  SET_APP (state, app) {
    state.app = app
  }
}

export const actions = {
  async nuxtServerInit ({ commit, state }, context) {
    const app = await context.app.$axios.$get('/')
    commit('SET_APP', app)
  }
}
