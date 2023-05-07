<template>
  <div>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="dashboard"><img src="/img/logo_ASYTECH.png" alt="Logo" /></a>
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
            </div>
          </div>
        </div>
        <SidebarCustomer />
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
      </div>
    </div>
    <div id="main">
      <div class="page-heading">
        <h3>TICKET</h3>
      </div>

      <section id="multiple-column-form">
        <div class="row match-height">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Ticket Attivi</h4>
                <div class="row" style="justify-content: center">
                  <div class="col-6 col-lg-4 col-md-6">
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
                              {{ activeTickets.length }}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-lg-4 col-md-6">
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
                              {{ expiredTickets.length }}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="page-heading">
              <section class="section">
                <div class="card">
                  <div class="card-body">
                    <section class="section">
                      <v-card>
                        <v-tabs v-model="tab" bg-color="#435ebe">
                          <v-tab value="one" color="white">ATTIVI</v-tab>
                          <v-tab value="two" color="white">SCADUTI</v-tab>
                        </v-tabs>
                        <v-card-text>
                          <v-window v-model="tab">
                            <v-window-item value="one">
                              <v-text-field label="CERCA"></v-text-field>
                              <v-data-table
                                :headers="header"
                                :items="this.activeTickets"
                                :search="search"
                                v-model:page.sync="page"
                                :items-per-page="itemsPerPage"
                                :hide-default-header="true"
                                :hide-default-footer="true"
                                disable-pagination
                              >
                                <template v-slot:[`item.actions`]="{ item }">
                                  <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
                                </template>
                              </v-data-table>
                            </v-window-item>
                            <v-window-item value="two">
                              <v-text-field label="CERCA"></v-text-field>
                              <v-data-table
                                :headers="header"
                                :items="this.expiredTickets"
                                :search="search"
                                v-model:page.sync="page"
                                :items-per-page="itemsPerPage"
                                :hide-default-header="true"
                                :hide-default-footer="true"
                                disable-pagination
                              >
                                <template v-slot:[`item.actions`]="{ item }">
                                  <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
                                </template>
                              </v-data-table>
                            </v-window-item>
                            <v-window-item value="three"> </v-window-item>
                          </v-window>
                        </v-card-text>
                      </v-card>
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import Sidebar from "@/components/customer/SidebarCustomer.vue";
  import axios from "axios";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "TicketHotel",
    components: { SidebarCustomer },
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        hotel: "",
        selectedTicket: "",
        search: "",
        header: [
          { title: "ID", key: "id" },
          { title: "DATA EMISSIONE", key: "emissionDate" },
          { title: "DATA SCADENZA", key: "expirationDate" },
          { title: "LOGIN", key: "login" },
          { title: "PASSWORD", key: "password" },

          { title: "UTENTE", key: "WebsurferId" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
        payload: {
          customer: "",
          websurfer: "",
          user: "",
        },
      };
    },
    computed: {
      activeTickets() {
        const today = new Date();
        return this.hsComponentStore.user.data.tickets.filter((ticket) => {
          const expired = new Date(ticket.expirationDate);
          return expired >= today && ticket.CustomerId == this.hsComponentStore.user.info.CustomerId && ticket.WebsurferId != null;
        });
      },
      expiredTickets() {
        const today = new Date();
        return this.hsComponentStore.user.data.tickets.filter((ticket) => {
          const expired = new Date(ticket.expirationDate);
          return expired <= today && ticket.CustomerId == this.hsComponentStore.user.info.CustomerId && ticket.WebsurferId != null;
        });
      },
    },
    methods: {
      insertTicket() {
        this.payload.user = this.hsComponentStore.user;
        this.payload.credentials = generateRandomCredentials();
        axios
          .post("/admin/tickets/insert", {
            payload: this.payload,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addTicket(response.data.result);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteTicket(ticket) {
        axios.post("/admin/tickets/delete", { payload: ticket }).then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.deleteTicket(ticket.id);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
      },
    },
  };
</script>
