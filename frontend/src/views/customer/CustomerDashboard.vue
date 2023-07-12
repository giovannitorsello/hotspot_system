<template>
  <div id="main">
    <SidebarCustomer />
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM</h3>
      <h4>Bentornato {{ this.hsComponentStore.loggedCustomer.companyName }}</h4>
    </div>
    <div class="page-content">
      <v-divider></v-divider>
      <StatsCustomer />
      <v-divider></v-divider>
      <TableWebsurfer />
    </div>
  </div>
</template>
<script>
import { hsStoreCustomer } from "@/store/storeCustomer.js";
import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
import TableWebsurfer from "@/components/customer/TableWebsurfer.vue";
import StatsCustomer from "@/components/customer/StatsCustomer.vue";
export default {
  components: { SidebarCustomer, TableWebsurfer, StatsCustomer },
  name: "CustomerDashboard",
  setup() {
    const hsComponentStore = hsStoreCustomer();
    return { hsComponentStore };
  },
};
</script>
