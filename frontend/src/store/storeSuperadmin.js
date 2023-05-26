import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreSuperadmin = defineStore({
  id: "storeSuperadmin",
  state: () => ({
    loggedUser: {},
    loggedSupedAdmin: {},
    resellersOfSelectedSuperadmin: [],
  }),
  getters: {},
  actions: {
    async init(user) {
      if (user && user.id > 0 && user.role === "SUPERADMIN") {
        this.loggedUser = user;
        this.loggedSuperadmin = user;
        this.resellersOfSelectedSuperadmin = await this.fetchResellers();
        return true;
      }
      return false;
    },
    //only for superadmin
    async fetchResellers() {
      const res = await axios.post("/api/reseller/getResellers");
      if (!res.data || !res.data.resellers) return {};
      return res.data.resellers;
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