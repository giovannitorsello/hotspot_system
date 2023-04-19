<template>
  <div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <div class="d-flex justify-content-between">
          <div class="logo">
            <a href="index.html"
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
                                <select  v-model="payload.role"  class="form-select">
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
                    <v-tabs v-model="tab" bg-color="primary">
                      <v-tab value="one">TUTTI</v-tab>
                      <v-tab value="two">MODIFICA</v-tab>
                      <v-tab value="three">ELIMINA</v-tab>
                    </v-tabs>

                    <v-card-text>
                      <v-window v-model="tab">
                        <v-window-item value="one">
                          <v-text-field label="CERCA"></v-text-field>
                          <v-table density="compact">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>RUOLO</th>
                                <th>USERNAME</th>
                                <th>PASSWORD</th>
                                <th>RESELLER</th>
                                <th>CLIENTE</th>

                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="user in userDataStore.userOfAllCustomers"
                                :key="user.id"
                              >
                                <td>{{ user.id }}</td>
                                <td v-if="user.role == 'RESELLER'">
                                  <span class="badge bg-primary">{{
                                    user.role
                                  }}</span>
                                </td>
                                <td v-if="user.role == 'HOTEL'">
                                  <span class="badge bg-success">{{
                                    user.role
                                  }}</span>
                                </td>
                                <td v-if="user.role == 'USER'">
                                  <span class="badge bg-dark">{{
                                    user.role
                                  }}</span>
                                </td>
                                <td>{{ user.utente }}</td>
                                <td>{{ user.password }}</td>
                                <td>{{ user.ResellerId }}</td>
                                <td>{{ user.CustomerId }}</td>
                                <td>
                                  <i
                                    class="bi bi-trash"
                                    @click="openDeleteUser(user)"
                                  >
                                  </i>
                                  <i
                                    class="bi bi-pen"
                                    @click="editUser(user)"
                                  ></i>
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
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
                                @click="deleteClient(selectedClient)"
                                >Elimina</v-btn
                              >
                              <v-btn @click="selectedClient = null"
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
</template>

<script>
import { useUserStore } from "@/store/counter";
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Users",
  components: { Sidebar },
  setup() {
    const userDataStore = useUserStore();

    return { userDataStore };
  },
  data() {
    return {
      tab: "",
      selectedUser:null,
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
            this.selectedUser = '';
            this.tab = 'one';
        },

        openDeleteUser(user) {
            this.selectedUser = user;
            this.tab = 'three';
        },
    editUser(user){
        this.selectedUser = user;
        this.tab="two";
    },

    insertUser() {
        this.payload.CustomerId= this.userDataStore.$state.user.CustomerId
        this.payload.ResellerId= this.userDataStore.$state.user.ResellerId
      axios
        .post("http://localhost/admin/users/insert", {
          payload: this.payload,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.userDataStore.addUser(response.data.result);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>