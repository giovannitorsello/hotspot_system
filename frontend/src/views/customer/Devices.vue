<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>GESTIONE WEBSURFER - Utenti finali</h3>
      </div>
      <TableDevices />
    </div>
  </div>
</template>

<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  import TableDevices from "@/components/customer/TableDevices.vue";
  import axios from "axios";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "Tickets",
    components: { SidebarCustomer, TableDevices },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        hotel: "",
        selectedDevice: "",
        search: "",
        header: [
          { title: "Description", key: "descritpion" },
          { title: "DATA SCADENZA", key: "setupAddress" },
          { title: "DURATA IN GIORNI", key: "ipv4" },
          { title: "PROFILO BANDA", key: "ipv6" },
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
          .post("/admin/device/insert", {
            selectedDevice: this.selectedDevice,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.devicesOfSelectedCustomer.push(selectedDevice);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteDevice(ticket) {
        axios.post("/admin/device/delete", { device: device }).then((response) => {
          if (response.data.status == 200) {
            const indexOfObject = this.hsComponentStore.devicesOfSelectedCustomer((object) => {
              return object.id === device.id;
            });
            this.hsComponentStore.devicesOfSelectedCustomer.splice(indexOfObject, 1);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
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
