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
    init(user) {
      if (user && user.id > 0 && user.role === "SUPERADMIN") {
        this.loggedUser = user;
        this.loggedSuperadmin = user;
        this.resellersOfSelectedSuperadmin = this.fetchResellers();
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
  },
  persist: true,
});
