import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreReseller = defineStore({
  id: "storeReseller",
  state: () => ({
    loggedUser: {},
    loggedReseller: {},
    customersOfSelectedReseller: [],
    usersOfSelectedReseller: [],
    devicesOfSelectedReseller: [],
    devicesOfSelectedCustomer: [],
    selectedCustomer: {},
    selectedDevice: {},
    selectedUser: {},

    //Statistics variables
    websurfers: [],
    lastTickets: [],
    activeTickets: [],
    expiredTickets: [],
  }),
  getters: {},
  actions: {
    async init(user) {
      if (user && user.id > 0 && user.role === "RESELLER") {
        this.loggedUser = user;
        await this.fetchResellerByUser(user);
        await this.fetchCustomersByReseller(this.loggedReseller);
        await this.fetchUsersByReseller(this.loggedReseller);
        await this.fetchDevicesByReseller(this.loggedReseller);
        return true;
      }
      return false;
    },
    async fetchResellerByUser(user) {
      const res = await axios.post("/api/user/getResellerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Reseller logged is:", res.data);
      this.loggedReseller = res.data.reseller;
      return res.data.reseller;
    },
    async fetchUsersByReseller(reseller) {
      if (!reseller || !reseller.id) return [];
      const res = await axios.post("/api/reseller/getUsersByReseller", { reseller: reseller });
      if (!res.data || !res.data.users) return [];
      this.usersOfSelectedReseller = res.data.users;
      return res.data.users;
    },
    async fetchCustomersByReseller(reseller) {
      if (!reseller || !reseller.id) return [];
      const res = await axios.post("/api/reseller/getCustomersByReseller", { reseller: reseller });
      if (!res.data || !res.data.customers) return [];
      this.customersOfSelectedReseller = res.data.customers;
      return res.data.customers;
    },
    async fetchDevicesByReseller(reseller) {
      if (!reseller || !reseller.id) return [];
      const res = await axios.post("/api/reseller/getDevicesByReseller", { reseller: reseller });
      if (!res.data || !res.data.devices) return [];
      this.devicesOfSelectedReseller = res.data.devices;
      return res.data.devices;
    },
    async fetchWebsurfersByCustomer(customer) {
      if (!customer || !customer.id) return [];
      const res = await axios.post("/api/websurfer/getWebsurfersByCustomer", { customer: customer });
      if (!res.data || !res.data.websurfers) return [];
      return res.data.websurfers;
    },
    async fetchDevicesByCustomer(customer) {
      if (!customer || !customer.id) return [];
      const res = await axios.post("/api/customer/getDevicesByCustomer", { customer: customer });
      if (!res.data || !res.data.devices) return [];
      this.devicesOfSelectedCustomer = res.data.devices;
      return res.data.devices;
    },

    async fetchStatisticsReseller(reseller) {},
    async fetchStatisticsCustomer(customer) {},
  },
  persist: true,
});
