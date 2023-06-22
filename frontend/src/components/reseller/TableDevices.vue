<template>
  <div>
    <v-row class="justify-content-center">
        <v-col cols="auto">
            <v-btn icon="bi bi-plus" @click="addDevice" /> </v-col>
    </v-row>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Cerca" single-line hide-details></v-text-field>
    <v-data-table
      :headers="header"
      :items="this.hsComponentStore.devicesOfSelectedReseller"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :hide-default-header="true"
      :hide-default-footer="true"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <i class="bi bi-trash" @click="deleteDevice(item.raw)"> </i>
        <i class="bi bi-pencil" @click="editDevice(item.raw)"> </i>
      </template>
      <template v-slot:[`item.state`]="{ item }">
        <p>OK</p>
      </template>
    </v-data-table>
    <FormDevice v-if="dialogEditDevice" @exitEditDevice="exitEditDevice" @saveDevice="saveDevice" />
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>
<script>
  import axios from "axios";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  import SnackbarMessage from "../general/SnackbarMessage.vue";

  export default {
    name: "TableDevice",
    components: { FormDevice,SnackbarMessage },
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    mounted() {
    
    },
    data() {
      return {
        dialogEditDevice: false,
        selectedReseller: {},
        selectedCustomer: {},
        selectedDevice: {},
        header: [
          { title: "Descrizione", key: "description" },
          { title: "Indirizzo installazione", key: "addressSetup" },
          { title: "Indirizzo Ipv4", key: "ipv4Management" },
          { title: "Indirizzo Ipv6", key: "ipv6Management" },
          { title: "Actions", key: "actions" },
          { title: "State", key: "state" },
        ],
        search: "",
        page: 1,
        itemsPerPage: 10,
      };
    },
    methods: {
      addDevice() {
            this.hsComponentStore.selectedDevice = {};
            this.dialogEditDevice = true;
        },
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
              if(device.CustomerId){
                utilityArrays.updateElementById(this.hsComponentStore.devicesOfSelectedCustomer, response.data.device);
              }else{
                utilityArrays.updateElementById(this.hsComponentStore.devicesOfSelectedReseller, response.data.device);
              }
              
              this.dialogEditDevice = false;
            } else {
              this.$emit("saveDeviceError");
            }
          });
      },
      deleteDevice(device) {
        axios.post("/api/device/delete", { device: device }).then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device);
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device);
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
      },
      editDevice(device) {
        console.log("Selected device is:", device);
        this.hsComponentStore.selectedDevice = device;
        this.dialogEditDevice = true;
      },
      exitEditDevice() {
        this.dialogEditDevice = false;
      },
    },
  };
</script>
