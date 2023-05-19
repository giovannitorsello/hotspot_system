<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>GESTIONE WEBSURFER - Utenti finali</h3>
      </div>
      <TableWebsurfer />
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import TableWebsurfer from "@/components/customer/TableWebsurfer.vue";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  export default {
    name: "Websurfers",
    components: { SidebarCustomer, TableWebsurfer },
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
