<template>
  <div id="main">
    <header class="mb-3">
      <a href="#" class="burger-btn d-block d-xl-none">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
    <SidebarSuperadmin />
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM -- SUPERADMIN DASHBOARD</h3>
      <h4>Bentornato {{ this.hsComponentStore.loggedSuperadmin.companyName }}</h4>
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
  data() {},
  
};
</script>
