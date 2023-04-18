import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'

export default createStore({
  namespaced: true,
  state: {
    user:{},
    dataUser:{},
    customerOfThisReseller:[],
    ticketsOfAllCustomers:[],
    userOfAllCustomers:[],
    websurfers:[],
  },
  getters: {
    allCustomers:state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_DATA_USER(state, dataUser){
      state.dataUser= dataUser;
    },
    SET_ALL_CUSTOMERS(state, data){
      state.customerOfThisReseller= data;
    }
  },
  actions: {
   
    async fetchAllData({commit} ){
     const response =await axios.post('http://localhost/admin/data/dataReseller', {user: this.state.user});
     console.log(response.data.data);
    },
    async addCustomer({dispatch, commit}, payload){
      const response= await axios.post('http://localhost/admin/customers/insert',{payload});
     dispatch('fetchAllData');
     return response;
    },
    






    async fetchCustomers({ commit }) {
      const response = await axios.get('/api/customers');
      commit('setCustomers', response.data);
    },

    async updateCustomer({ commit }, customerData) {
      const response = await axios.put(`/api/customers/${customerData.id}`, customerData);
      commit('updateCustomer', response.data);
    },
    async deleteCustomer({ commit }, customerId) {
      await axios.delete(`/api/customers/${customerId}`);
      commit('deleteCustomer', customerId);
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
