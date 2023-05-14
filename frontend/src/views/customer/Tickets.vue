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
        <h3>GESTIONE TICKET</h3>
      </div>

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
                          <v-tab value="one" color="white">Tickets</v-tab>
                        </v-tabs>
                        <v-card-text>
                          <v-window v-model="tab">
                            <v-window-item value="one">
                              <v-text-field label="CERCA"></v-text-field>
                              <v-data-table
                                :headers="header"
                                :items="hsComponentStore.ticketsActiveOfSelectedCustomer"
                                :search="search"
                                :page.sync="page"
                                :items-per-page="itemsPerPage"
                                :hide-default-header="true"
                                :hide-default-footer="true"
                                disable-pagination
                                @click:row="selectTicket"
                              >
                                <template v-slot:[`item.bandwidthProfile`]="{ item }">
                                  {{ getBandwidthProfileName(item) }}
                                </template>

                                <template v-slot:[`item.actions`]="{ item }">
                                  <i class="bi bi-trash" title="ELIMINA" @click="deleteTicket(item.raw)"> </i>
                                </template>
                              </v-data-table>
                            </v-window-item>
                            <v-window-item value="two">
                              <v-card>
                                <v-card-title> Modifica cliente </v-card-title>
                                <v-card-text>
                                  <v-text-field v-model="selectedTicket.id" label="ID"></v-text-field>
                                  <v-text-field v-model="selectedTicket.emissionDate" label="DATA EMISSIONE"></v-text-field>
                                  <v-text-field v-model="selectedTicket.expirationDate" label="DATA SCADENZA"></v-text-field>
                                  <v-text-field v-model="selectedTicket.durationDays" label="DURATA (GG)"></v-text-field>
                                  <v-text-field v-model="selectedTicket.login" label="USERNAME"></v-text-field>
                                  <v-text-field v-model="selectedTicket.password" label="PASSWORD"></v-text-field>
                                  <v-text-field v-model="selectedTicket.serialNumber" label="N.SERIALE"></v-text-field>
                                  <v-text-field v-model="selectedTicket.state" label="STATO"></v-text-field>
                                  <v-text-field v-model="selectedTicket.profile" label="PROFILO"></v-text-field>
                                  <v-text-field v-model="selectedTicket.WebsurferId" label="ID_WEBSURFER"></v-text-field>
                                  <v-text-field v-model="selectedTicket.CustomerId" label="ID_CLIENTE"></v-text-field>
                                  <v-text-field v-model="selectedTicket.ResellerId" label="ID_RESELLER"></v-text-field>
                                  <v-text-field v-model="selectedTicket.pinAzienda" label="PIN AZIENDA"></v-text-field>
                                  <v-text-field v-model="selectedTicket.note" label="NOTE"></v-text-field>
                                  <v-row>
                                    <v-col>
                                      <v-sheet class="pa-2 ma-1" align="end">
                                        <i class="bi bi-arrow-left ma-1" title="INDIETRO" style="font-size: xx-large" @click="goBack()"></i>
                                        <i class="bi bi-check-circle ma-1" title="SALVA" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                                      </v-sheet>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-window-item>
                            <v-window-item value="three">
                              <v-card>
                                <v-card-title>Conferma eliminazione</v-card-title>
                                <v-card-text>
                                  <p>Vuoi eliminare il ticket n."{{ selectedTicket.id }}"?</p>
                                </v-card-text>
                                <v-card-actions>
                                  <v-btn color="primary" @click="deleteUser(selectedUser)">Elimina</v-btn>
                                  <v-btn @click="goBack()">Annulla</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-window-item>
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
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  import axios from "axios";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "Tickets",
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
          { title: "DURATA IN GIORNI", key: "durationDays" },
          { title: "PROFILO BANDA", key: "bandwidthProfile" },
          { title: "LOGIN", key: "login" },
          { title: "PASSWORD", key: "password" },
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
      selectTicket(row, object) {
        var ticketId = object.item.columns.id;
        //recover websurfer object for this ticket
        var activeTickets = this.hsComponentStore.ticketsActiveOfSelectedCustomer;
        var webSurfers = this.hsComponentStore.websurfersOfSelectedCustomer;
        var selectedTicket = activeTickets.find((elem) => elem.id == ticketId);
        var webSurfer = webSurfers.find((elem) => elem.id == selectedTicket.WebsurferId);
        //recover websurfer object for this ticket
        console.log("Selected ticket is is:", selectedTicket);
        console.log("Websurfer of this ticket is: ", webSurfer);
        var msg = webSurfer.firstname + " " + webSurfer.lastname;
        this.$swal("Ticket appartenente a " + msg);
      },
      getBandwidthProfileName(item) {
        try {
          var bandwidthProfileObject = JSON.parse(item.columns.bandwidthProfile);
          return bandwidthProfileObject.name;
        } catch (error) {
          console.log("Error in parsing object bandwith", error);
          console.log(item);
          return "----";
        }
      },
    },
  };
</script>
