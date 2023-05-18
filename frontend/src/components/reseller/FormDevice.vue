<template>
  <v-dialog v-model="dialogEditDevice" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica Dispositivo </v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedDevice.description" label="Descrizione"></v-text-field>
        <v-text-field v-model="selectedDevice.addressSetup" label="Indirizzo di installazione"></v-text-field>
        <v-text-field v-model="selectedDevice.ipv4Management" label="Profilo IPV4"></v-text-field>
        <v-text-field v-model="selectedDevice.ipv6Management" label="Profilo IPV6"></v-text-field>
        <v-text-field v-model="selectedDevice.api_key" label="api_key"></v-text-field>
        <v-text-field v-model="selectedDevice.defaultBandwidth" label="Profilo banda default"></v-text-field>
        <v-text-field v-model="selectedDevice.preAuthLandingPage" label="Pagina di pre-autorizzazione"></v-text-field>
        <v-text-field v-model="selectedDevice.postAuthLandingPage" label="pagina di post-autorizzazione"></v-text-field>
        <v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.websurferCustomFields" label="Campi aggiuntivi form registrazione (JSON)"></v-textarea>
        <v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.bandwidthProfiles" label="Profili di banda (JSON)"></v-textarea>
        <v-textarea rows="10" row-height="10" auto-grow v-model="selectedDevice.deviceAuthProperties" label="Profilo accesso device (JSON)"></v-textarea>
        <v-row>
          <v-col>
            <v-sheet class="pa-2 ma-1" align="end">
              <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exit()"></i>
              <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveDevice(selectedDevice)"></i>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import axios from "axios";
  export default {
    name: "FormDevice",
    components: {},
    props: ["bShow"],
    setup() {
      const hsComponentStore = hsStoreReseller();
      console.log("Selected device is:", hsComponentStore.selectedDevice);
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditDevice: true,
        selectedReseller: {},
        selectedCustomer: {},
        selectedDevice: {},
        header: [
          { title: "Descrizione", key: "description" },
          { title: "Indirizzo installazione", key: "setupAddress" },
          { title: "Indirizzo Ipv4", key: "ipv4Management" },
          { title: "Indirizzo Ipv6", key: "ipv6Management" },
          { title: "Actions", key: "actions" },
          { title: "State", key: "state" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    mounted() {
      this.dialogEditDevice = true;
      this.selectedReseller = this.hsComponentStore.loggedReseller;
      this.selectedCustomer = this.hsComponentStore.selectedCustomer;
      this.selectedDevice = this.hsComponentStore.selectedDevice;
    },
    methods: {
      saveDevice() {
        this.$emit("saveDevice", this.selectedDevice);
      },
      deleteDevice(device) {
        this.$emit("deleteDevice", this.selectedDevice);
      },
      editDevice(device) {
        console.log("Selected device is:", device);
        this.hsComponentStore.selectedDevice = device;
      },
      selectDevice(row, object) {
        var deviceId = object.item.columns.id;
        const indexOfObject = this.hsComponentStore.devicesOfSelectedCustomer((object) => {
          return object.id === device.id;
        });
        this.selectedDevice = this.hsComponentStore.devicesOfSelectedCustomer[indexOfObject];
      },
      exit() {
        this.dialogEditDevice = false;
        this.$emit("exitEditDevice");
      },
    },
  };
</script>
