<template>
  <div id="main">
    <SidebarSuperadmin />
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM</h3>
      <h5>Bentornato {{ this.hsComponentStore.loggedSuperadmin.firstname }}</h5>
    </div>
    <div class="page-content">
      <v-divider></v-divider>
      <StatsSuperadmin />
      <v-divider></v-divider>
      <TableResellers />
    </div>
  </div>
</template>

<script>
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
import SidebarSuperadmin from "@/components/superadmin/SidebarSuperadmin.vue";
import TableResellers from "@/components/superadmin/TableResellers.vue";
import StatsSuperadmin from "@/components/superadmin/StatsSuperadmin.vue";
export default {
  components: { SidebarSuperadmin, TableResellers, StatsSuperadmin },
  name: "Dashboard",
  setup() {
    const hsComponentStore = hsStoreSuperadmin();
    return { hsComponentStore };
  },
};
</script>
