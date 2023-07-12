<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>DISPOSITIVI</h3>
        <h5>Gestione apparati hardware</h5>
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
    name: "Devices",
    components: { SidebarCustomer, TableDevices },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {};
    },
    mounted() {},
    methods: {},
  };
</script>
