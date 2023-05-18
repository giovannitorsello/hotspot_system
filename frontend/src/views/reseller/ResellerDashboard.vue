<template>
  <div>
    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <SidebarReseller />

      <div class="page-heading">
        <h3>WIFI TICKET SYSTEM -- {{ this.hsComponentStore.loggedReseller.companyName }}</h3>
        <h4>Bentornato {{ this.hsComponentStore.loggedUser.utente }}</h4>
      </div>
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
                        <h6 class="text-muted font-semibold">CLIENTI</h6>
                        <h6 class="font-extrabold mb-0">
                          {{ hsComponentStore.customersOfSelectedReseller.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                          {{ hsComponentStore.websurfers.length }}
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
                          {{ hsComponentStore.activeTickets.length }}
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
                          {{ hsComponentStore.expiredTickets.length }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-6">
              <TableCustomers />
            </div>

            <div class="row">
              <div class="col-12 col-xl-6">
                <div class="card">
                  <div class="card-header text-align-center">
                    <h4>ULTIMI WEBSURFER INSERITI(3 GIORNI)</h4>
                  </div>
                  <div class="card-body" v-if="hsComponentStore.lastWebsurfers != {}">
                    <v-card>
                      <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                      <v-card-text>
                        <v-window>
                          <v-window-item>
                            <v-table>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>NOME</th>
                                  <th>COGNOME</th>
                                  <th>EMAIL</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="websurfer in hsComponentStore.lastWebsurfers" :key="websurfer.id">
                                  <td>{{ websurfer.id }}</td>
                                  <td>{{ websurfer.firstname }}</td>
                                  <td>{{ websurfer.lastname }}</td>
                                  <td>{{ websurfer.email }}</td>
                                </tr>
                              </tbody>
                            </v-table>
                          </v-window-item>
                        </v-window>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>

              <div class="col-12 col-xl-6">
                <div class="card">
                  <div class="card-header">
                    <h4>ULTIMI TICKET CREATI(3 GIORNI)</h4>
                  </div>

                  <div class="card-body" v-if="hsComponentStore.lastTickets.length > 0">
                    <v-card>
                      <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                      <v-card-text>
                        <v-window>
                          <v-window-item>
                            <v-table>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>DATA CREAZIONE</th>
                                  <th>DATA SCADENZA</th>
                                  <th>USERNAME</th>
                                  <th>PASSWORD</th>
                                  <th>CUSTOMER</th>
                                  <th>WEBSURFER</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="ticket in hsComponentStore.lastTickets" :key="ticket.id">
                                  <td>{{ ticket.id }}</td>
                                  <td>{{ ticket.emissionDate }}</td>
                                  <td>{{ ticket.expirationDate }}</td>
                                  <td>{{ ticket.login }}</td>
                                  <td>{{ ticket.password }}</td>
                                  <td>{{ ticket.CustomerId }}</td>
                                  <td>{{ ticket.WebsurferId }}</td>
                                </tr>
                              </tbody>
                            </v-table>
                          </v-window-item>
                        </v-window>
                      </v-card-text>
                    </v-card>
                  </div>
                  <div class="card-body" v-if="(hsComponentStore.lastTickets.length = 0)">
                    <v-card>
                      <v-tabs v-model="tab" bg-color="#435ebe"></v-tabs>
                      <v-card-text>
                        <v-window>
                          <v-window-item>
                            <v-table>
                              <tbody>
                                <tr>
                                  <td>"NESSUN NUOVO TICKET"</td>
                                </tr>
                              </tbody>
                            </v-table>
                          </v-window-item>
                        </v-window>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
  import TableCustomers from "@/components/reseller/TableCustomers.vue";
  export default {
    components: { SidebarReseller, TableCustomers },
    name: "Dashboard",
    setup() {
      const hsComponentStore = hsStoreReseller();
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
