<template>
  <div>
    <SidebarReseller />
    <div id="main">
      <div class="page-heading">
        <h3>CLIENTI</h3>
      </div>
      <TableCustomers />
    </div>
  </div>
</template>

<script>
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
  import TableCustomers from "@/components/reseller/TableCustomers.vue";
  export default {
    name: "Customers",
    components: { SidebarReseller, TableCustomers },
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
