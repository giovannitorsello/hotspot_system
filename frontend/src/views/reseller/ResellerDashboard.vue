<template>
  <div id="main">
    <header class="mb-3">
      <a href="#" class="burger-btn d-block d-xl-none">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
    <SidebarReseller />
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM</h3>
      <h4>Bentornato {{ this.hsComponentStore.loggedReseller.companyName }}</h4>
    </div>
    <div class="page-content">
        <v-divider></v-divider>
        <StatsReseller />
        <v-divider></v-divider>
        <TableCustomers />
    </div>
  </div>
</template>

<script>
import { hsStoreReseller } from "@/store/storeReseller.js";
import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
import TableCustomers from "@/components/reseller/TableCustomers.vue";
import StatsReseller from "@/components/reseller/StatsReseller.vue";
export default {
  components: { SidebarReseller, TableCustomers, StatsReseller },
  name: "Dashboard",
  setup() {
    const hsComponentStore = hsStoreReseller();
    return { hsComponentStore };
  },
  data() {},
 
};
</script>
