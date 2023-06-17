<template>
  <div>
    <SidebarSupeadmin />
    <div id="main">
      <div class="page-heading">
        <h3>RIVENDITORI</h3>
      </div>
      <TableResellers />
    </div>
  </div>
</template>

<script>
  import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
  import SidebarSupeadmin from "@/components/superadmin/SidebarSuperadmin.vue";
  import TableResellers from "@/components/superadmin/TableResellers.vue";
  export default {
    name: "Resellers",
    components: { SidebarSupeadmin, TableResellers },
    setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
