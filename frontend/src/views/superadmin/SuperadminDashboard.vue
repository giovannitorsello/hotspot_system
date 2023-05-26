<template>
  <div>
    <div id="main">
      <div class="page-heading">
        <h3>WIFI TICKET SYSTEM -- SUPERADMIN DASHBOARD</h3>
        <h4>Bentornato {{ this.hsComponentStore.loggedUser.username }}</h4>
      </div>
      <SidebarSuperadmin />
      <!-- INSERISCI FORM PER DEFINIRE I RESELLER CON LE FUNZIONI DI INSERIMENTO MODIFICA E CREAZIONE UTENTE CORRISPONDENTE -->
      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="row" style="justify-content: center">
              <!-- Statistiche customer-->
              <div class="col-6 col-lg-2 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon blue">
                          <i class="iconly-boldProfile"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">RESELLER</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.resellersOfSelectedSuperadmin.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-6">
              <TableReseller/>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
  import SidebarSuperadmin from "@/components/superadmin/SidebarSuperadmin.vue";
  import TableReseller from "@/components/superadmin/TableResellerSuperadmin.vue";
  export default {
    components: { SidebarSuperadmin, TableReseller },
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