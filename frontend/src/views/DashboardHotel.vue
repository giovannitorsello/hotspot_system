<template>
  <div>
    <Sidebar />
    <div id="main">
      <div class="page-heading">
        <h3>TICKET SYSTEM STATUS</h3>
        <h4>Bentornato {{ this.hsComponentStore.user.utente }}</h4>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="row" style="justify-content: center">
              <div class="card-content">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label for="first-name-column">Nome</label>
                        <input type="text" class="form-control" v-model="payload.firstname" />
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label for="last-name-column">Cognome</label>
                        <input type="text" class="form-control" v-model="payload.lastname" />
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label for="city-column">Email</label>
                        <input type="text" class="form-control" v-model="payload.email" />
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label for="country-floating">Telefono</label>
                        <input type="text" class="form-control" v-model="payload.phone" />
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="form-group">
                        <label for="company-column">Note</label>
                        <input type="text" class="form-control" v-model="payload.note" />
                      </div>
                    </div>
                    <div class="col-12 d-flex justify-content-end">
                      <button type="submit" class="btn btn-primary me-1 mb-1" @click="insertWebsurfer()">Inserisci</button>
                    </div>
                  </div>
                </div>
                <v-card>
                  <v-tabs v-model="tab" bg-color="#435ebe">
                    <v-tab value="one" color="white" :hidden="disableTab">CLIENTI</v-tab>
                    <v-tab value="two" color="white" :hidden="enableTabs">MODIFICA</v-tab>
                    <v-tab value="three" color="white" :hidden="enableTabs">TICKET</v-tab>

                    <v-tab value="four" color="white" :hidden="enableTabs">ELIMINA</v-tab>
                  </v-tabs>

                  <v-card-text>
                    <v-window v-model="tab">
                      <v-window-item value="one">
                        <v-text-field v-model="search" label="CERCA"></v-text-field>

                        <v-data-table :headers="header" :items="hsComponentStore.user.data.websurfers" :search="search" v-model:page.sync="page" :items-per-page="itemsPerPage" @click:row="onRowClick">
                          <template v-slot:[`item.actions`]="{ item }">
                            <i class="bi bi-trash" @click="deleteWebsurfer(item.raw)"> </i>
                            <i class="bi bi-pen" @click="editWebsurfer(item.raw)"></i>
                          </template>
                        </v-data-table>
                      </v-window-item>

                      <v-window-item value="two">
                        <v-card>
                          <v-card-title> Modifica WEBSURFER </v-card-title>
                          <v-card-text>
                            <v-text-field v-model="selectedWebsurfer.firstname" label="NOME"></v-text-field>
                            <v-text-field v-model="selectedWebsurfer.lastname" label="COGNOME"></v-text-field>
                            <v-text-field v-model="selectedWebsurfer.email" label="EMAIL"></v-text-field>
                            <v-text-field v-model="selectedWebsurfer.note" label="NOTE"></v-text-field>
                            <v-text-field v-model="selectedWebsurfer.phone" label="TELEFONO"></v-text-field>
                            <v-row>
                              <v-col>
                                <v-sheet class="pa-2 ma-1" align="end">
                                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer()"></i>
                                  <i class="bi bi-plus-circle ma-1" style="font-size: xx-large" @click="newTicket()"></i>
                                </v-sheet>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-window-item>

                      <v-window-item value="three">
                        <v-card>
                          <v-data-table :headers="headerTicket" :items="filterTicket" :search="search" v-model:page.sync="page" :items-per-page="itemsPerPage" disable-pagination>
                            <template v-slot:[`item.actions`]="{ item }">
                              <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
                            </template>
                          </v-data-table>
                          <v-row>
                            <v-col>
                              <v-sheet class="pa-2 ma-1" align="end">
                                <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                                <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer()"></i>
                                <i class="bi bi-plus-circle ma-1" style="font-size: xx-large" @click="newTicket()"></i>
                              </v-sheet>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-window-item>

                      <v-window-item value="four">
                        <v-card>
                          <v-card-title>Conferma eliminazione</v-card-title>
                          <v-card-text>
                            <p>Vuoi eliminare il websurfer "{{ selectedWebsurfer.firstname }}"?</p>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" @click="deleteWebsurfer(this.selectedWebsurfer)">Elimina</v-btn>
                            <v-btn @click="tab = 'one'">Annulla</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import Sidebar from "@/components/Sidebar.vue";
  import TableWebsurfer from "@/components/TableWebsurfer.vue";
  export default {
    components: { Sidebar, TableWebsurfer },
    name: "DashboardHotel",
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        search: "",
        tab: "one",
        selectedWebsurfer: null,
        selectedClient: null,
        page: 1,
        itemsPerPage: 10,
        header: [
          { title: "ID", key: "id" },
          { title: "NOME", key: "firstname" },
          { title: "COGNOME", key: "lastname" },
          { title: "EMAIL", key: "email" },
          { title: "TELEFONO", key: "phone" },
          { title: "NOTE", key: "note" },
          { title: "SOCIAL", key: "typeSocial" },
          { title: "Actions", key: "actions" },
        ],
        headerTicket: [
          { title: "ID", key: "id" },
          { title: "DATA EMISSIONE", key: "emissionDate" },
          { title: "DATA SCADENZA", key: "expirationDate" },
          { title: "LOGIN", key: "login" },
          { title: "PASSWORD", key: "password" },
          { title: "HOTEL", key: "CustomerId" },
          { title: "UTENTE", key: "WebsurferId" },
          { title: "Actions", key: "actions" },
        ],
        payload: {
          firstname: "",
          lastname: "",
          email: "",
          note: "",
          phone: "",
        },
      };
    },
    computed: {
      disableTab() {
        if (this.tab != "one") {
          return true;
        } else {
          return false;
        }
      },
      enableTabs() {
        if (this.selectedWebsurfer != null && this.tab != "one") {
          return false;
        } else {
          return true;
        }
      },
      filterTicket() {
        return this.hsComponentStore.user.data.tickets.filter((ticket) => ticket.WebsurferId == this.selectedWebsurfer.id);
      },
    },
    methods: {
      fetchClient(text) {
        axios.get;
      },
      onRowClick(cellData, item) {
        this.selectedWebsurfer = item.item.raw;
        this.tab = "two";
      },
      editWebsurfer(websurfer) {
        this.selectedWebsurfer = websurfer;

        this.hidden = true;
        this.tab = "two";
      },
      alertDeleteWebsurfer(websurfer) {
        this.selectedWebsurfer = websurfer;
        this.tab = "three";
      },
      goBack() {
        this.selectedWebsurfer = "";
        this.tab = "one";
      },
      saveWebsurfer() {
        axios
          .post("/admin/websurfers/update", {
            payload: this.selectedWebsurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.updateWebsurfer(this.selectedWebsurfer);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteWebsurfer(selectedWebsurfer) {
        axios
          .post("/admin/websurfers/delete", {
            payload: selectedWebsurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.deleteWebsurfer(selectedWebsurfer.id);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      insertWebsurfer() {
        axios
          .post("/admin/websurfers/insert", {
            payload: this.payload,
            user: this.hsComponentStore.user,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status == 200) {
              this.hsComponentStore.addWebsurfer(response.data.result);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      insertTicket() {
        this.payload.user = this.hsComponentStore.user;
        this.payload.credentials = generateRandomCredentials();
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
    },
  };
</script>
