<template>
  <div>
    <v-text-field v-model="search" append-icon="mdi-magnify" label="Cerca" single-line hide-details></v-text-field>
    <v-data-table
      :headers="header"
      :items="this.hsComponentStore.devicesOfSelectedCustomer"
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
</template>
<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  import axios from "axios";
  export default {
    name: "TableDevice",
    components: { FormDevice },
    setup() {
      const hsComponentStore = hsStoreReseller();
      console.log("Selected customer is:", hsComponentStore.selectedCustomer);
      hsComponentStore.fetchDevicesByCustomer(hsComponentStore.selectedCustomer);
      return { hsComponentStore };
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
              utilityArrays.updateElementById(this.hsComponentStore.devicesOfSelectedCustomer, response.data.device);
              this.dialogEditDevice = false;
            } else {
              this.$emit("saveDeviceError");
            }
          });
      },
      deleteDevice(device) {
        axios.post("/api/device/delete", { device: device }).then((response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.devicesOfSelectedCustomer, device.id);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
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
      selectDevice(row, object) {
        var deviceId = object.item.columns.id;
        const indexOfObject = this.hsComponentStore.devicesOfSelectedCustomer((object) => {
          return object.id === device.id;
        });
        this.selectedDevice = this.hsComponentStore.devicesOfSelectedCustomer[indexOfObject];
      },
    },
  };
</script>
