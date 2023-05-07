<template>
  <div>
    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <div class="page-heading">
        <h3>WIFI TICKET SYSTEM -- SUPERADMIN DASHBOARD</h3>
        <h4>Bentornato {{ this.hsComponentStore.loggedUser.utente }}</h4>
      </div>
      <SidebarSuperadmin />
      <!-- INSERISCI FORM PER DEFINIRE I RESELLER CON LE FUNZIONI DI INSERIMENTO MODIFICA E CREAZIONE UTENTE CORRISPONDENTE -->
    </div>
  </div>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import SidebarSuperadmin from "@/components/superadmin/SidebarSuperadmin.vue";
  import TableReseller from "@/components/superadmin/TableReseller.vue";
  export default {
    components: { SidebarSuperadmin, TableReseller },
    name: "Dashboard",
    setup() {
      const hsComponentStore = hsStore();
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
