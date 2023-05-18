import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreCustomer = defineStore({
  id: "storeCustomer",
  state: () => ({
    loggedUser: {},
    loggedCustomer: {},
    resellerOfSelectedCustomer: {},
    websurfersOfSelectedCustomer: [],
    usersOfSelectedCustomer: [],
    devicesOfSelectedCustomer: [],
    ticketsActiveOfSelectedCustomer: [],
    ticketsExpiredOfSelectedCustomer: [],
  }),
  getters: {},
  actions: {
    async init(user) {
      if (user && user.id > 0 && user.role === "CUSTOMER") {
        this.loggedUser = user;
        this.loggedCustomer = await this.fetchCustomerByUser(user);

        console.log("Logged customer is: ", this.loggedCustomer);
        this.devicesOfSelectedCustomer = await this.fetchDevicesByCustomer(this.loggedCustomer);
        this.websurfersOfSelectedCustomer = await this.fetchWebsurfersByCustomer(this.loggedCustomer);

        this.ticketsActiveOfSelectedCustomer = await this.fetchActiveTicketsByCustomer(this.loggedCustomer);
        this.ticketsExpiredOfSelectedCustomer = await this.fetchExpiredTicketsByCustomer(this.loggedCustomer);

        this.usersOfSelectedCustomer = await this.fetchUsersByCustomer(this.loggedCustomer);
        return true;
      }
      return false;
    },

    async fetchCustomerByUser(user) {
      const res = await axios.post("/api/user/getCustomerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Customer logged is:", res.data);
      return res.data.customer;
    },
    async fetchWebsurfersByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/websurfer/getWebsurfersByCustomer", { customer: customer });
      if (!res.data || !res.data.websurfers) return {};
      return res.data.websurfers;
    },
    async fetchUsersByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getUsersByCustomer", { customer: customer });
      if (!res.data || !res.data.users) return {};
      return res.data.users;
    },
    async fetchDevicesByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getDevicesByCustomer", { customer: customer });
      if (!res.data || !res.data.devices) return {};
      return res.data.devices;
    },
    async fetchTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchTicketsByWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return {};
      const res = await axios.post("/api/websurfer/getTicketsByWebsurfer", { websurfer: websurfer });
      if (!res.data || !res.data.websurfer) return {};
      return res.data.websurfer;
    },
    async fetchTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchActiveTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getActiveTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchExpiredTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/customer/getExpiredTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async generateTicketForNewWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return {};
      const res = await axios.post("/api/customer/generateTicketForNewWebsurfer", { websurfer: websurfer });
      if (!res.data || !res.data.ticket) return {};
      return res.data.ticket;
    },

    async fetchStatisticsCustomer(customer) {},
  },
  persist: true,
});
