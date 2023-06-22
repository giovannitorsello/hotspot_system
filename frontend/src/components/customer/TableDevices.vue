<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Cerca"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="hsComponentStore.devicesOfSelectedCustomer"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :hide-default-header="true"
      :hide-default-footer="true"
    >
      <template v-slot:[`item.state`]="{ item }">
        <p>OK</p>
      </template>
    </v-data-table>
    <FormDevice
      v-if="dialogEditDevice"
      @exitEditDevice="exitEditDevice"
      @saveDevice="saveDevice"
    />
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>
<script>
import axios from "axios";
import utilityArrays from "@/utils/utilityArrays.js";
import { hsStoreCustomer } from "@/store/storeCustomer.js";
import FormDevice from "@/components/reseller/FormDevice.vue";
import SnackbarMessage from "../general/SnackbarMessage.vue";

export default {
  name: "TableDevices",
  components: { FormDevice, SnackbarMessage },
  setup() {
    const hsComponentStore = hsStoreCustomer();
    return { hsComponentStore };
  },
  data() {
    return {
      dialogEditDevice: false,
      selectedReseller: {},
      selectedCustomer: {},
      selectedDevice: {},
      headers: [
        { title: "Descrizione", key: "description" },
        { title: "Indirizzo installazione", key: "addressSetup" },
        { title: "State", key: "state" },
      ],
      search: "",
      page: 1,
      itemsPerPage: 10,
    };
  },
  mounted() {
    console.log("devices: ", this.hsComponentStore.devicesOfSelectedCustomer);
  },
  methods: {
    saveDevice(device) {
      console.log("Device to be saved:", device);
      device.ResellerId = this.hsComponentStore.loggedReseller.id;
      device.CustomerId = this.hsComponentStore.selectedCustomer.id;

      axios
        .post("/api/device/save", {
          device: device,
        })
        .then((response) => {
          if (response.data.status == 200) {
            utilityArrays.updateElementById(
              this.hsComponentStore.devicesOfSelectedCustomer,
              response.data.device
            );
            this.dialogEditDevice = false;
          } else {
            this.$emit("saveDeviceError");
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
    editDevice(device) {
      this.hsComponentStore.selectedDevice = device;
      this.dialogEditDevice = true;
    },
    exitEditDevice() {
      this.dialogEditDevice = false;
    },
  },
};
</script>
