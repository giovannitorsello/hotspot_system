import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreCustomer = defineStore({
  id: "storeCustomer",
  state: () => ({
    loggedCustomer: {},
    websurfersOfSelectedCustomer: [],
    usersOfSelectedCustomer: [],
    devicesOfSelectedCustomer: [],
    allTicketOfThisCustomer: [],
    ticketsActiveOfSelectedCustomer: [],
    ticketsExpiredOfSelectedCustomer: [],
    ticketsOfSelectedWebsurfer: [],
  }),
  actions: {
    async init(user) {
      if (user && user.id > 0 && user.role === "CUSTOMER") {
        this.loggedUser = user;
        await this.fetchCustomerByUser(user);
        await this.fetchUsersByCustomer(this.loggedCustomer);
        await this.fetchDevicesByCustomer(this.loggedCustomer);
        await this.fetchWebsurfersByCustomer(this.loggedCustomer);
        await this.fetchTicketsByCustomer(this.loggedCustomer);
        await this.fetchActiveTicketsByCustomer(this.loggedCustomer);
        await this.fetchExpiredTicketsByCustomer(this.loggedCustomer);

        return true;
      }
      return false;
    },

    async fetchCustomerByUser(user) {
      const res = await axios.post("/api/user/getCustomerByUser", { user: user });
      if (!res.data || !res.data.customer) return {};

      this.loggedCustomer = res.data.customer;
      return res.data.customer;
    },
    async fetchUsersByCustomer(customer) {
      if (!customer || !customer.id) return [];

      const res = await axios.post("/api/customer/getUsersByCustomer", { customer: customer });
      if (!res.data || !res.data.users) return [];

      this.usersOfSelectedCustomer = res.data.users;
      return res.data.users;
    },
    async fetchWebsurfersByCustomer(customer) {
      if (!customer || !customer.id) return [];

      const res = await axios.post("/api/websurfer/getWebsurfersByCustomer", { customer: customer });
      if (!res.data || !res.data.websurfers) return [];

      this.websurfersOfSelectedCustomer = res.data.websurfers;
      return res.data.websurfers;
    },
    async fetchDevicesByCustomer(customer) {
      if (!customer || !customer.id) return [];
      const res = await axios.post("/api/customer/getDevicesByCustomer", { customer: customer });
      if (!res.data || !res.data.devices) return [];
      this.devicesOfSelectedCustomer = res.data.devices;
      return res.data.devices;
    },
    async fetchTicketsByCustomer(customer) {
      if (!customer || !customer.id) return [];
      const res = await axios.post("/api/customer/getTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return [];
      this.allTicketOfThisCustomer = res.data.tickets;
      return res.data.tickets;
    },
    async fetchTicketsByWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return [];
      const res = await axios.post("/api/websurfer/getTicketsByWebsurfer", { websurfer: websurfer });
      if (!res.data || !res.data.tickets) return [];
      this.ticketsOfSelectedWebsurfer = res.data.tickets;
      return res.data.tickets;
    },
    async fetchActiveTicketsByCustomer(customer) {
      if (!customer || !customer.id) return [];

      const res = await axios.post("/api/customer/getActiveTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return [];

      this.ticketsActiveOfSelectedCustomer = res.data.tickets;
      return res.data.tickets;
    },
    async fetchExpiredTicketsByCustomer(customer) {
      if (!customer || !customer.id) return [];

      const res = await axios.post("/api/customer/getExpiredTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return [];

      this.ticketsExpiredOfSelectedCustomer = res.data.tickets;
      return res.data.tickets;
    },
    async generateTicketForNewWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return [];

      const res = await axios.post("/api/customer/generateTicketForNewWebsurfer", { websurfer: websurfer });
      if (!res.data || !res.data.ticket) return [];

      return res.data.ticket;
    },

    async fetchStatisticsCustomer(customer) {},
  },
  persist: true,
});
