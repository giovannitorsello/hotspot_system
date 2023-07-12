<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>WEBSURFER</h3>
        <h5>Gestione dei websurfer della tua struttura</h5>
      </div>
      <TableWebsurfer />
    </div>
  </div>
</template>

<script>
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
  };
</script>
