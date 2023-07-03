import { defineStore } from "pinia";
import axios from "axios";

export const hsStoreWebsurfer = defineStore('storeWebsurfer', {
  state: () => (
    { device: {}, customerDevice: {}, customerInfo: {}, newWebsurfer:{}, }
  ),
  actions: {
    async deviceInit() {
      await this.fetchDeviceInfo();
      await this.fetchInfoCustomer(this.device.api_key);
      await this.fetchDataCustomer(this.customerDevice.CustomerId);
      return true;
    },
    async fetchDeviceInfo() {
      const res = await axios.post("/getInfoWebsurfer");
      if (!res.data)
        return {};
      this.device = res.data;
      return res.data;
    },
    async fetchInfoCustomer(_api_key) {
      const res = await axios.post("/getDeviceByApiKey", { api_key: _api_key });
      if (!res.data)
        return {};
      this.customerDevice = res.data.device;
      return res.data.device;
    },
    async fetchDataCustomer(_CustomerId) {
      const res = await axios.post("/getCustomerInfoByDevice", { CustomerId: _CustomerId });
      if (!res.data)
        return {};
      this.customerInfo = res.data.customer;
      return res.data.customer;
    },
    persist: true,
  }
});
