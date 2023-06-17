<template>
  <div id="main">
    <div class="page-heading">
      <h3>WIFI TICKET SYSTEM -- SUPERADMIN DASHBOARD</h3>
      <h4>Bentornato {{ this.hsComponentStore.loggedUser.username }}</h4>
    </div>
    <SidebarSuperadmin />
    <v-container>
      <v-divider></v-divider>
      <StatsSuperadmin />
      <v-divider></v-divider>
      <TableResellers />
    </v-container>
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
    data() {
      return {
        tab: "one",
      };
    },
    methods: {},
  };
</script>
