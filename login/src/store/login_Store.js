import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreWebsurfer = defineStore(
  'storeWebsurfer',
  {
  state: () => ({
    device: {},
  }),
  actions: {
    async deviceInit(){
      await this.fetchDeviceInfo();
      return true;
    },
    async fetchDeviceInfo() {
      const res = await axios.post("/getInfoWebsurfer");
      if (!res.data) return {};
      this.device = res.data;
      return res.data;
    },
  },

});
