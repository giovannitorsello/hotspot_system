import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{}
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {
  }
})
