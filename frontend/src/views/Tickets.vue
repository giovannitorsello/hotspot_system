<template>
  <div>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="dashboard"
                ><img src="/img/logo_ASYTECH.png" alt="Logo"
              /></a>
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"
                ><i class="bi bi-x bi-middle"></i
              ></a>
            </div>
          </div>
        </div>
        <Sidebar />
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
      </div>
    </div>
    <div id="main">
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <div class="page-heading">
        <h3>TICKET</h3>
      </div>

      <section id="multiple-column-form">
        <div class="row match-height">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">INSERISCI NUOVO TICKET</h4>
              </div>
              <div class="card-content">
                <div class="card-body">
                  <div class="col-md-6 col-12">
                    <div class="form-group">
                      <label for="first-name-column"
                        >SELEZIONA STRUTTURA: {{ payload.customer }}</label>
                      <fieldset class="form-group">
                        <select v-model="payload.customer" class="form-select">
                          <option
                            v-for="customer in hsComponentStore.customerOfThisReseller"
                            :value="customer"
                            :key="customer.id"
                          >
                            {{ customer.companyName }}
                          </option>
                        </select>
                      </fieldset>
                    </div>
                  </div>
                  <div class="col-md-6 col-12" v-if="payload.customer != ''">
                    <div class="form-group">
                      <label for="first-name-column"
                        >SELEZIONA CLIENTE: {{ payload.websurfer }}</label
                      >
                      <fieldset class="form-group">
                        <select
                          v-model="payload.websurfer"
                          class="form-select"
                        >
                          <template
                            v-for="websurfer in hsComponentStore.websurfers"
                            :key="websurfer.id"
                          >
                            <option
                              v-if="websurfer.CustomerId == payload.customer.id"
                              :value="websurfer"
                            >
                              {{ websurfer.firstname }}
                            </option>
                          </template>
                        </select>
                      </fieldset>
                    </div>
                  </div>
                  <div class="col-12 d-flex justify-content-end">
                    <button
                      type="submit"
                      class="btn btn-primary me-1 mb-1"
                      @click="insertTicket()"
                    >
                      Inserisci
                    </button>
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
                          <v-tab value="one" color="white">TUTTI</v-tab>
                        <!--   <v-tab value="two" color="white">MODIFICA</v-tab>
                          <v-tab value="three" color="white">ELIMINA</v-tab> -->
                        </v-tabs>
                        <v-card-text>
                          <v-window v-model="tab">
                            <v-window-item value="one">
                              <v-text-field label="CERCA"></v-text-field>
                              <v-data-table
                                :headers="header"
                                :items="hsComponentStore.ticketsOfAllCustomers"
                                :search="search"
                                v-model:page.sync="page"
                                :items-per-page="itemsPerPage"
                                :hide-default-header="true"
                                :hide-default-footer="true"
                                disable-pagination
                              >
                                <template v-slot:[`item.actions`]="{ item }">
                                  <i class="bi bi-trash" @click="deleteTicket(item.raw)">
                                  </i>
                                </template>
                              </v-data-table>
                            </v-window-item>
                            <v-window-item value="two">
                              <v-card>
                                <v-card-title> Modifica cliente </v-card-title>
                                <v-card-text>
                                  <v-text-field
                                    v-model="selectedTicket.id"
                                    label="ID"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.emissionDate"
                                    label="DATA EMISSIONE"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.expirationDate"
                                    label="DATA SCADENZA"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.durationDays"
                                    label="DURATA (GG)"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.login"
                                    label="USERNAME"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.password"
                                    label="PASSWORD"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.serialNumber"
                                    label="N.SERIALE"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.state"
                                    label="STATO"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.profile"
                                    label="PROFILO"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.WebsurferId"
                                    label="ID_WEBSURFER"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.CustomerId"
                                    label="ID_CLIENTE"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.ResellerId"
                                    label="ID_RESELLER"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.pinAzienda"
                                    label="PIN AZIENDA"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="selectedTicket.note"
                                    label="NOTE"
                                  ></v-text-field>
                                  <v-row>
                                    <v-col>
                                      <v-sheet class="pa-2 ma-1" align="end">
                                        <i
                                          class="bi bi-arrow-left ma-1"
                                          style="font-size: xx-large"
                                          @click="goBack()"
                                        ></i>
                                        <i
                                          class="bi bi-check-circle ma-1"
                                          style="font-size: xx-large"
                                          @click="
                                            saveWebsurfer(selectedCustomer)
                                          "
                                        ></i>
                                      </v-sheet>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-window-item>
                            <v-window-item value="three">
                              <v-card>
                                <v-card-title
                                  >Conferma eliminazione</v-card-title
                                >
                                <v-card-text>
                                  <p>
                                    Vuoi eliminare il ticket n."{{
                                      selectedTicket.id
                                    }}"?
                                  </p>
                                </v-card-text>
                                <v-card-actions>
                                  <v-btn
                                    color="primary"
                                    @click="deleteUser(selectedUser)"
                                    >Elimina</v-btn
                                  >
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
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";
import generateRandomCredentials from "@/utils/random";
export default {
  name: "Tickets",
  components: { Sidebar },
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
        { title: "HOTEL", key: "CustomerId" },
        { title: "UTENTE", key: "WebsurferId" },
        { title: "Actions", key: "actions" },
      ],
      page: 1,
      itemsPerPage: 10,
      payload: {
      customer:'',
      websurfer:'',
      user:'',
      },
    };
  },
  props: {},

  methods: {
    insertTicket() {
      this.payload.user= this.hsComponentStore.user;
      this.payload.credentials= generateRandomCredentials();
      axios
        .post("/admin/tickets/insert", {
          payload: this.payload,
        })
        .then((response) => {
          console.log(response);
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