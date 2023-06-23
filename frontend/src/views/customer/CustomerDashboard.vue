<template>
  <div id="main">
    <header class="mb-3">
      <a href="#" class="burger-btn d-block d-xl-none">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
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
  data() {
    return {};
  },
};
</script>
