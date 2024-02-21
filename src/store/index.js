import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false
  },
  getters: {
  },
  mutations: {
    logged(state, payload) {
      state.logged = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
