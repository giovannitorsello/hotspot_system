import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreSuperadmin = defineStore({
  id: "storeSuperadmin",
  state: () => ({
    loggedUser: {},
    loggedSuperadmin: {},
    resellersOfSelectedSuperadmin: [],
    usersResellerOfselectedSuperadmin: [],
  }),
  getters: {},
  actions: {
    async init(user) {
      if (user && user.id > 0 && user.role === "SUPERADMIN") {
        this.loggedUser = user;
        this.loggedSuperadmin = user;
        await this.fetchResellers();
        return true;
      }
      return false;
    },

    async fetchResellers() {
      const res = await axios.post("/api/reseller/getResellers");
      if (!res.data || !res.data.resellers) {
        this.resellersOfSelectedSuperadmin = [];
        return [];
      }
      this.resellersOfSelectedSuperadmin = res.data.resellers;
      return res.data.resellers;
    },
    async fetchUsersResellers(superadmin) {
      const res = await axios.post("/api/reseller/getResellersUser", { superadmin: superadmin });
      if (!res.data || !res.data.users) {
        this.usersResellerOfselectedSuperadmin = [];
        return [];
      }
      this.usersResellerOfselectedSuperadmin = res.data.users;
      return res.data.users;
    },
    async fetchStatisticsSuperadmin() {},
    async fetchStatisticsReseller(reseller) {},
    async fetchStatisticsCustomer(customer) {},
    addReseller(newItem) {
      this.resellersOfSelectedSuperadmin.push(newItem);
    },
    deleteReseller(id) {
      this.resellersOfSelectedSuperadmin = this.resellersOfSelectedSuperadmin.filter((t) => {
        return t.id !== id;
      });
    },
    updateReseller(toUpdate) {
      var oldReseller = this.resellersOfSelectedSuperadmin.findIndex((x) => x.item == toUpdate.id);
      var newReseller = this.resellersOfSelectedSuperadmin[oldReseller];
      newReseller = toUpdate;
      this.resellersOfSelectedSuperadmin[oldReseller] = newReseller;
    },
  },
  persist: true,
});
