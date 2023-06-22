<template>
  <div>
    <SidebarReseller />
    <div id="main">
      <div class="page-heading">
        <h3>DISPOSITIVI</h3>
      </div>
      <TableDevices />
    </div>
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>
<script>
import { hsStoreReseller } from "@/store/storeReseller.js";
import FormDevice from "@/components/reseller/FormDevice.vue";
import TableDevices from "@/components/reseller/TableDevices.vue";
import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
import SnackbarMessage from "@/components/general/SnackbarMessage.vue";
import axios from "axios";
import generateRandomCredentials from "@/utils/random";
export default {
  name: "Tickets",
  components: { FormDevice, SidebarReseller, TableDevices, SnackbarMessage },
  setup() {
    const hsComponentStore = hsStoreReseller();
    return { hsComponentStore };
  },
  data() {
    return {
      dialogAddDevice: false,
      tab: "",
      hotel: "",
      selectedDevice: "",
      search: "",
      header: [
        { title: "Descrizione", key: "descritpion" },
        { title: "Indirizzo installazione", key: "setupAddress" },
        { title: "Indirizzo Ipv4", key: "ipv4" },
        { title: "Indirizzo Ipv6", key: "ipv6" },
        { title: "Actions", key: "actions" },
      ],
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    insertDevice() {
      var customer = this.hsComponentStore.loggedCustomer;
      this.selectedDevice.CustomerId = customer.id;
      this.selectedDevice.ResellerId = customer.ResellerId;
      axios
        .post("/api/device/insert", {
          selectedDevice: this.selectedDevice,
        })
        .then((response) => {
          if (response.data.status == 200) {
            utilityArrays.updateElementById(
              this.hsComponentStore.devicesOfSelectedCustomer,
              this.selectedDevice
            );
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
    },
    deleteDevice(device) {
      axios
        .post("/api/device/delete", { device: device })
        .then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(
              this.hsComponentStore.devicesOfSelectedCustomer,
              device
            );
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            utilityArrays.deleteElementById(
              this.hsComponentStore.devicesOfSelectedCustomer,
              device
            );
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
    },
  },
};
</script>
