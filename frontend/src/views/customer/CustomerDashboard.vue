<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>WIFI TICKET SYSTEM -- {{ this.hsComponentStore.loggedCustomer.companyName }}</h3>
        <h4>Bentornato {{ this.hsComponentStore.loggedUser.utente }}</h4>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="row" style="justify-content: center">
              <!-- Statistiche ultimi websurfer-->
              <div class="col-6 col-lg-2 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon green">
                          <i class="iconly-boldAdd-User"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">NUOVI WEBSURFER</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.lastWebsurfers != {} ? 0 : hsComponentStore.lastWebsurfers.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Statistiche websurfer-->
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
                        <h6 class="text-muted font-semibold">WEBSURFER</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.websurfersOfSelectedCustomer.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Statistiche Attivi-->
              <div class="col-6 col-lg-2 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon purple">
                          <i class="iconly-boldShow"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">TICKET ATTIVI</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.ticketsActiveOfSelectedCustomer.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Statistiche Scaduti-->
              <div class="col-6 col-lg-2 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon red">
                          <i class="iconly-boldBookmark"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">TICKET SCADUTI</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.ticketsExpiredOfSelectedCustomer.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TableWebsurfer />
      </div>
    </div>
  </div>
</template>
<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  import TableWebsurfer from "@/components/customer/TableWebsurfer.vue";
  export default {
    components: { SidebarCustomer, TableWebsurfer },
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
