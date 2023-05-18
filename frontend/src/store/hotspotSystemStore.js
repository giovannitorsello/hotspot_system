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
    usersOfSelectedCustomer: [],
    usersOfSelectedReseller: [],

    ticketsActiveOfSelectedCustomer: [],
    ticketsExpiredOfSelectedCustomer: [],

    devicesOfSelectedCustomer: [],
    devicesOfSelectedReseller: [],
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
        this.customersOfSelectedReseller = await this.fetchCustomersByReseller(this.loggedReseller);
        this.usersOfSelectedReseller = await this.fetchUsersByReseller(this.loggedReseller);
        console.log("Logged reseller is:", res.data.reseller);
      }
      if (res.data.user.role === "CUSTOMER") {
        this.loggedUser = res.data.user;
        this.loggedCustomer = res.data.customer;
        this.loggedReseller = {};
        this.devicesOfSelectedCustomer = await this.fetchDevicesByCustomer(res.data.customer);
        this.websurfersOfSelectedCustomer = await this.fetchWebsurfersByCustomer(res.data.customer);
        //SECTION TICKETS CUSTOMER
        this.ticketsActiveOfSelectedCustomer = await this.fetchActiveTicketsByCustomer(res.data.customer);
        this.ticketsExpiredOfSelectedCustomer = await this.fetchExpiredTicketsByCustomer(res.data.customer);
        //SECTION TICKETS CUSTOMER

        this.usersOfSelectedCustomer = await this.fetchUsersByCustomer(res.data.customer);
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
      const res = await axios.post("/api/reseller/getResellers");
      if (!res.data || !res.data.resellers) return {};
      return res.data.resellers;
    },
    async fetchCustomerByUser(user) {
      const res = await axios.post("/api/user/getCustomerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Customer logged is:", res.data);
      return res.data.reseller;
    },
    async fetchResellerByUser(user) {
      const res = await axios.post("/api/user/getResellerByUser", { user: user });
      if (!res.data || !res.data.reseller) return {};
      console.log("Reseller logged is:", res.data);
      return res.data.reseller;
    },
    async fetchCustomersByReseller(reseller) {
      if (!reseller || !reseller.id) return {};
      const res = await axios.post("/api/reseller/getCustomersByReseller", { reseller: reseller });
      if (!res.data || !res.data.customers) return {};
      return res.data.customers;
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
    async fetchUsersByReseller(reseller) {
      if (!reseller || !reseller.id) return {};
      const res = await axios.post("/api/reseller/getUsersByReseller", { reseller: reseller });
      if (!res.data || !res.data.users) return {};
      return res.data.users;
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
    async fetchStatisticsSuperadmin() {},
    async fetchStatisticsReseller(reseller) {},
    async fetchStatisticsCustomer(customer) {},
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
      if (this.user.info.role == "CUSTOMER") {
        this.websurfersOfSelectedCustomer.push(newWebsurfer);
      } else {
        this.websurfers.push(newWebsurfer);
      }
    },
    addUser(newUser) {
      this.userOfAllCustomers.push(newUser);
    },

    addTicket(newTicket) {
      if (this.user.info.role == "CUSTOMER") {
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
      if (this.user.info.role == "CUSTOMER") {
        this.websurfersOfSelectedCustomer = this.websurfersOfSelectedCustomer.filter((t) => {
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
      if (this.user.info.role == "RESELLER") {
        this.ticketsOfAllCustomers = this.ticketsOfAllCustomers.filter((t) => {
          return t.id !== id;
        });
      }

      if (this.user.info.role == "CUSTOMER") {
        this.ticketsActiveOfSelectedCustomer = this.ticketsActiveOfSelectedCustomer.filter((t) => {
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
  persist: true,
});
