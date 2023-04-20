import { defineStore } from "pinia";
import axios from "axios";

export const hsStore = defineStore({
  id: "hotspotSystemStore",
  state: () => ({
    user: {},
    customerOfThisReseller: [],
    websurfers: [],
    ticketsOfAllCustomers: [],
    userOfAllCustomers: [],
    lastWebsurfers: [],
    lastTickets: [],
    activeTickets: [],
    expiredTickets: [],
  }),
  getters: {},
  actions: {
    async fetchUserProfile(username, password) {
      const res = await axios.post("/admin/login", { username: username, password: password });
      this.user = res.data.user;
      this.fetchUserData();
    },
    async fetchUserData() {
      const res = await axios.post("/admin/data/dataReseller", { user: this.user });
      this.customerOfThisReseller = res.data.data.customerOfThisReseller;
      this.websurfers = res.data.data.websurfers;
      this.ticketsOfAllCustomers = res.data.data.ticketsOfAllCustomers;
      this.userOfAllCustomers = res.data.data.userOfAllCustomers;
      this.lastWebsurfers = res.data.data.lastWebsurfers;
      this.lastTickets = res.data.data.lastTickets;
      this.activeTickets = res.data.data.activeTickets;
      this.expiredTickets = res.data.data.expiredTickets;
    },
    addCustomer(newItem) {
      this.customerOfThisReseller.push(newItem);
    },
    addWebsurfer(newWebsurfer) {
      this.websurfers.push(newWebsurfer);
    },
    addUser(newUser) {
      this.userOfAllCustomers.push(newUser);
    },
    deleteCustomer(id) {
      this.customerOfThisReseller = this.customerOfThisReseller.filter((t) => {
        return t.id !== id;
      });
    },
    deleteWebsurfer(id) {
      this.websurfers = this.websurfers.filter((t) => {
        return t.id !== id;
      });
    },
    deleteUser(id){
      this.userOfAllCustomers= this.userOfAllCustomers.filter((t)=> {
        return t.id !== id;
      })
    },
    updateCustomer(toUpdate) {
      var oldCustomer = this.customerOfThisReseller.findIndex((x) => x.item == toUpdate.id);
      var newCustomer = this.customerOfThisReseller[oldCustomer];
      newCustomer = toUpdate;
      this.customerOfThisReseller[oldCustomer] = newCustomer;
    },
    updateWebsurfer(toUpdate) {
      var oldWebsurfer = this.websurfers.findIndex((x) => x.item == toUpdate.id);
      var newWebsurfer = this.websurfers[oldWebsurfer];
      newWebsurfer = toUpdate;
      this.websurfers[oldWebsurfer] = newWebsurfer;
    },
  },
});
