import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


export default createStore({
  namespaced: true,
  state: {
    user:{},
    dataUser:{}
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_DATA_USER(state, dataUser){
      state.dataUser= dataUser;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
