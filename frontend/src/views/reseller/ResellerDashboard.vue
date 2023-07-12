<template>
  <div id="main">
    <SidebarReseller />
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM</h3>
      <h5>Bentornato {{ this.hsComponentStore.loggedReseller.companyName }}</h5>
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
};
</script>
