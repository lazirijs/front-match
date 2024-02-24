import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    team: null
  },
  getters: {
  },
  mutations: {
    logged: (state, payload) => state.logged = payload,
    team: (state, payload) => state.team = payload,
  },
  actions: {
  },
  modules: {
  }
})
