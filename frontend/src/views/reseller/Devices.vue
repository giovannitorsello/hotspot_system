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
</template>
<script>
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import FormDevice from "@/components/reseller/FormDevice.vue";
  import TableDevices from "@/components/reseller/TableDevices.vue";
  import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
  import axios from "axios";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "Tickets",
    components: { FormDevice, SidebarReseller, TableDevices },
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
              this.hsComponentStore.devicesOfSelectedCustomer.push(selectedDevice);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
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
