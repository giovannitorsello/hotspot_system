<template>
  <div>
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo">
              <a href="/dashboard"
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
        <h3>UTENTI</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-12">
            <div class="page-heading">
              <section class="section">
                <div class="card">
                  <div class="col-md-6 col-12">
                    <div class="card">
                      <div class="card-header">
                        <h4 class="card-title">INSERISCI NUOVO UTENTE</h4>
                      </div>
                      <div class="card-content">
                        <div class="card-body">
                          <div class="form-body">
                            <div class="row">
                              <div class="col-md-4">
                                <label>Nome Utente</label>
                              </div>
                              <div class="col-md-8">
                                <div class="form-group has-icon-left">
                                  <div class="position-relative">
                                    <input
                                      type="text"
                                      class="form-control"
                                      v-model="payload.utente"
                                      required
                                    />
                                    <div class="form-control-icon">
                                      <i class="bi bi-person"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <label>Password</label>
                              </div>
                              <div class="col-md-8">
                                <div class="form-group has-icon-left">
                                  <div class="position-relative">
                                    <input
                                      type="password"
                                      class="form-control"
                                      v-model="payload.password"
                                      required
                                    />
                                    <div class="form-control-icon">
                                      <i class="bi bi-lock"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <label>Ruolo</label>
                              </div>
                              <div class="col-md-8">
                                <fieldset class="form-group">
                                  <select
                                    v-model="payload.role"
                                    class="form-select"
                                  >
                                    <option disabled value="">
                                      Seleziona privilegi
                                    </option>
                                    <option>HOTEL</option>
                                    <option>USER</option>
                                  </select>
                                </fieldset>
                              </div>
                              <!--   <% if(role == "RESELLER"){ %>
                                                                        <div class="col-md-4">
                                                                            <label>Cliente</label>
                                                                        </div>
                                                                        
                                                                        <div class="col-md-8">
                                                                            <fieldset class="form-group">
                                                                                <select class="form-select" name="client"
                                                                                    required>
                                                                                    <% clients.forEach(function(client) { %>
                                                                                        <option value=<%=client.id %>> <%=
                                                                                                client.companyName %>
                                                                                        </option>
                                                                                        <% }) %>
                                                                                </select>
                                                                            </fieldset>
                                                                        </div>
                                                                        <% } %> -->
                              <div class="col-12 d-flex justify-content-end">
                                <button
                                  type="submit"
                                  class="btn btn-primary me-1 mb-1"
                                  @click="insertUser()"
                                >
                                  INSERISCI
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section class="section">
                    <v-card>
                      <v-tabs v-model="tab" bg-color="#435ebe">
                        <v-tab value="one" color="white">TUTTI</v-tab>
                        <v-tab value="two" color="white">MODIFICA</v-tab>
                        <v-tab value="three" color="white">ELIMINA</v-tab>
                      </v-tabs>

                      <v-card-text>
                        <v-window v-model="tab">
                          <v-window-item value="one">
                            <v-text-field label="CERCA"></v-text-field>
                            <v-data-table
                              :headers="header"
                              :items="hsComponentStore.userOfAllCustomers"
                              :search="search"
                              v-model:page.sync="page"
                              :items-per-page="itemsPerPage"
                              :hide-default-header="true"
                              :hide-default-footer="true"
                              disable-pagination
                            >
                              <template v-slot:[`item.role`]="{ item }">
                                
                                
                                    <span class="badge bg-primary" v-if="item.raw.role == 'RESELLER'">{{ item.raw.role }}</span>
                                
                                    <span class="badge bg-success" v-if="item.raw.role == 'HOTEL'">{{ item.raw.role }}</span>
                                 
                                    <span class="badge bg-dark" v-if="item.raw.role == 'USER'">{{ item.raw.role }}</span>
                                 
                              </template>
                              <template v-slot:[`item.actions`]="{ item }">
                                <i
                                  class="bi bi-trash"
                                  @click="deleteWebsurfer(item.raw)"
                                >
                                </i>
                                <i
                                  class="bi bi-pen"
                                  @click="editWebsurfer(item.raw)"
                                ></i>
                              </template>
                            </v-data-table>
                          </v-window-item>
                          <v-window-item value="two">
                            <v-card>
                              <v-card-title> Modifica cliente </v-card-title>
                              <v-card-text>
                                <v-text-field
                                  v-model="selectedUser.role"
                                  label="RUOLO"
                                ></v-text-field>
                                <v-text-field
                                  v-model="selectedUser.utente"
                                  label="USERNAME"
                                ></v-text-field>
                                <v-text-field
                                  v-model="selectedUser.password"
                                  label="PASSWORD"
                                ></v-text-field>
                                <v-text-field
                                  v-model="selectedUser.ResellerId"
                                  label="ID_RESELLER"
                                ></v-text-field>
                                <v-text-field
                                  v-model="selectedUser.CustomerId"
                                  label="ID_CLIENTE"
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
                                        @click="saveWebsurfer(selectedCustomer)"
                                      ></i>
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
                                <p>
                                  Vuoi eliminare il cliente "{{
                                    selectedUser.utente
                                  }}"?
                                </p>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn
                                  color="primary"
                                  @click="deleteUser(selectedUser)"
                                  >Elimina</v-btn
                                >
                                <v-btn @click="selectedUser = null"
                                  >Annulla</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-window-item>
                        </v-window>
                      </v-card-text>
                    </v-card>
                  </section>
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
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Users",
  components: { Sidebar },
  setup() {
    const hsComponentStore = hsStore();
    return { hsComponentStore };
  },
  data() {
    return {
      tab: "",
      selectedUser: null,
      search: "",
      header: [
        { title: "ID", key: "id" },
        { title: "RUOLO", key: "role" },
        { title: "USERNAME", key: "utente" },
        { title: "PASSWORD", key: "password" },
        { title: "RESELLER _ID", key: "ResellerId" },
        { title: "CUSTOMER_ID", key: "CustomerId" },
        { title: "Actions", key: "actions" },
      ],
      page: 1,
      itemsPerPage: 10,
      payload: {
        utente: "",
        role: "",
        password: "",
        CustomerId: "",
      },
    };
  },
  methods: {
    goBack() {
      this.selectedUser = "";
      this.tab = "one";
    },

    openDeleteUser(user) {
      this.selectedUser = user;
      this.tab = "three";
    },
    editUser(user) {
      this.selectedUser = user;
      this.tab = "two";
    },

    insertUser() {
      this.payload.CustomerId = this.hsComponentStore.$state.user.CustomerId;
      this.payload.ResellerId = this.hsComponentStore.$state.user.ResellerId;
      axios
        .post("/admin/users/insert", {
          payload: this.payload,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.addUser(response.data.result);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
    },
    deleteUser(user) {
      axios.post("/admin/users/delete", { payload: user }).then((response) => {
        if (response.data.status == 200) {
          this.hsComponentStore.deleteUser(user.id);
          this.tab = "one";
          this.$swal(response.data.msg);
        } else {
          this.$swal(response.data.msd);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
