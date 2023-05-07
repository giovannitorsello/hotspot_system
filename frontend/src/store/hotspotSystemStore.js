import { defineStore } from "pinia";
import axios from "axios";

export const hsStore = defineStore({
  id: "hotspotSystemStore",
  state: () => ({
    user: {
      info: {},
      data: {},
    },
    customerOfThisReseller: [],
    websurfers: [],
    ticketsOfAllCustomers: [],
    userOfAllCustomers: [],
    lastWebsurfers: [],
    lastTickets: [],
    activeTickets: [],
    expiredTickets: [],

    //Variabili inserite Giovanni Torsello 04/05/2023
    loggedSupedAdmin: {},
    loggedReseller: {},
    loggedCustomer: {},
    loggedUser: {},
    resellers: [],
    resellersOfSelectedSuperadmin: [],
    customersOfSelectedReseller: [],
    websurfersOfSelectedCustomer: [],
    ticketsOfSelectedCustomer: [],
    ticketsActiveOfSelectedCustomer: [],
    ticketsExpiredOfSelectedCustomer: [],
  }),
  getters: {
    /*loggetUser(state) {
      return state.loggedUser;
    },
    loggetReseller(state) {
      return state.loggedReseller;
    },
    loggetCustomer(state) {
      return state.loggedCustomer;
    },*/
  },
  actions: {
    async fetchUserProfile(username, password) {
      const res = await axios.post("/admin/login", {
        username: username,
        password: password,
      });
      this.user.info = res.data.user;
      if (res.data.user.role === "SUPERADMIN") {
        this.loggedUser = res.data.user;
        this.loggedCustomer = {};
        this.loggedReseller = {};
        this.resellersOfSelectedSuperadmin = this.fetchResellers();
        console.log(res.data);
      }
      if (res.data.user.role === "RESELLER") {
        this.loggedUser = res.data.user;
        this.loggedReseller = res.data.reseller;
        this.loggedCustomer = {};
        this.customersOfSelectedReseller = this.fetchCustomersByReseller();
        console.log("Logged reseller is:", res.data.reseller);
      }
      if (res.data.user.role === "HOTEL") {
        this.loggedUser = res.data.user;
        this.loggedCustomer = res.data.customer;
        this.loggedReseller = {};
        this.websurfersOfSelectedCustomer = this.fetchWebsurfersByCustomer(this.loggedCustomer);
        console.log("Logged customer is:", res.data.customer);
        //To remove
        this.fetchHotelData();
      } else {
        this.loggedUser = res.data.user;
        //To remove
        this.fetchUserData();
      }
    },

    //only for superadmin
    async fetchResellers() {
      const res = await axios.post("/api/data/getResellers");
      if (!res.data || !res.data.resellers) return {};
      return res.data.resellers;
    },
    async fetchCustomerByUser(user) {
      const res = await axios.post("/api/data/getCustomerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Customer logged is:", res.data);
      return res.data.reseller;
    },
    async fetchResellerByUser(user) {
      const res = await axios.post("/api/data/getResellerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Reseller logged is:", res.data);
      return res.data.reseller;
    },
    async fetchCustomersByReseller(reseller) {
      if (!reseller || !reseller.id) return {};
      const res = await axios.post("/api/data/getCustomersByReseller", { reseller: reseller });
      if (!res.data || !res.data.customers) return {};
      return res.data.customers;
    },
    async fetchWebsurfersByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/data/getWebsurfersByCustomer", { customer: customer });
      if (!res.data || !res.data.websurfers) return {};
      return res.data.websurfers;
    },
    async fetchTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/data/getTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchTicketsByWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return {};
      const res = await axios.post("/api/data/getTicketsByWebSurfer", { websurfer: websurfer });
      if (!res.data || !res.data.websurfer) return {};
      return res.data.websurfer;
    },
    async fetchTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/data/getTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchActiveTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/data/getActiveTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async fetchExpiredTicketsByCustomer(customer) {
      if (!customer || !customer.id) return {};
      const res = await axios.post("/api/data/getExpiredTicketsByCustomer", { customer: customer });
      if (!res.data || !res.data.tickets) return {};
      return res.data.tickets;
    },
    async generateTicketForNewWebsurfer(websurfer) {
      if (!websurfer || !websurfer.id) return {};
      const res = await axios.post("/api/data/generateTicketForNewWebsurfer", { websurfer: websurfer });
      if (!res.data || !res.data.ticket) return {};
      return res.data.ticket;
    },
    async fetchUserData() {
      const res = await axios.post("/admin/data/dataReseller", { user: this.user.info });
      this.customerOfThisReseller = res.data.data.customerOfThisReseller;
      this.websurfers = res.data.data.websurfers;
      this.ticketsOfAllCustomers = res.data.data.ticketsOfAllCustomers;
      this.userOfAllCustomers = res.data.data.userOfAllCustomers;
      this.lastWebsurfers = res.data.data.lastWebsurfers;
      this.lastTickets = res.data.data.lastTickets;
      this.activeTickets = res.data.data.activeTickets;
      this.expiredTickets = res.data.data.expiredTickets;
    },

    async fetchHotelData() {
      const res = await axios.post("/admin/data/dataHotel", { user: this.user.info });
      this.user.data.websurfers = res.data.data.websurfers;
      this.user.data.tickets = res.data.data.tickets;
    },

    addCustomer(newItem) {
      this.customerOfThisReseller.push(newItem);
    },

    addWebsurfer(newWebsurfer) {
      if (this.user.info.role == "HOTEL") {
        this.user.data.websurfers.push(newWebsurfer);
      } else {
        this.websurfers.push(newWebsurfer);
      }
    },
    addUser(newUser) {
      this.userOfAllCustomers.push(newUser);
    },

    addTicket(newTicket) {
      if (this.user.info.role == "HOTEL") {
        this.user.data.tickets.push(newTicket);
      } else {
        this.ticketsOfAllCustomers.push(newTicket);
      }
    },

    deleteCustomer(id) {
      this.customerOfThisReseller = this.customerOfThisReseller.filter((t) => {
        return t.id !== id;
      });
    },
    deleteWebsurfer(id) {
      if (this.user.info.role == "HOTEL") {
        this.user.data.websurfers = this.user.data.websurfers.filter((t) => {
          return t.id !== id;
        });
      } else {
        this.websurfers = this.websurfers.filter((t) => {
          return t.id !== id;
        });
      }
    },

    deleteUser(id) {
      this.userOfAllCustomers = this.userOfAllCustomers.filter((t) => {
        return t.id !== id;
      });
    },

    deleteTicket(id) {
      if (this.user.info.role == "HOTEL") {
        this.user.data.tickets = this.user.data.tickets.filter((t) => {
          return t.id !== id;
        });
      } else {
        this.ticketsOfAllCustomers = this.ticketsOfAllCustomers.filter((t) => {
          return t.id !== id;
        });
      }
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
