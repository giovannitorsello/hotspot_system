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
        <SidebarReseller />
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
                <h4 class="card-title">INSERISCI NUOVO DISPOSITIVO</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="page-content">
        <TableDevices />
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
                        </v-tabs>
                        <v-card-text>
                          <v-window v-model="tab">
                            <v-window-item value="one">
                              <v-text-field label="CERCA"></v-text-field>
                              <v-data-table
                                :headers="header"
                                :items="hsComponentStore.ticketsOfAllCustomers"
                                :search="search"
                                :page.sync="page"
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
                              <v-card>
                                <v-card-title> Modifica cliente </v-card-title>
                                <v-card-text>
                                  <v-text-field v-model="selectedDevice.descriptio" label="Descrizione"></v-text-field>
                                  <v-text-field v-model="selectedDevice.setupAdress" label="Indirizzo di installazione"></v-text-field>
                                  <v-text-field v-model="selectedDevice.emissionDate" label="IPV4"></v-text-field>
                                  <v-text-field v-model="selectedDevice.expirationDate" label="IPV6"></v-text-field>
                                  <v-row>
                                    <v-col>
                                      <v-sheet class="pa-2 ma-1" align="end">
                                        <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                                        <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
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
                                  <p>Vuoi eliminare il dispositivo n."{{ selectedDevice.id }}"?</p>
                                </v-card-text>
                                <v-card-actions>
                                  <v-btn color="primary" @click="deleteDevice(selectedDevice)">Elimina</v-btn>
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
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  import TableDevices from "@/components/customer/TableDevices.vue";
  import axios from "axios";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "Tickets",
    components: { SidebarCustomer, TableDevices },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        hotel: "",
        selectedDevice: "",
        search: "",
        header: [
          { title: "Description", key: "descritpion" },
          { title: "DATA SCADENZA", key: "setupAddress" },
          { title: "DURATA IN GIORNI", key: "ipv4" },
          { title: "PROFILO BANDA", key: "ipv6" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    methods: {
      insertDevice() {
        var customer = this.hsComponentStore.loggedCustomer;
        this.selectedDevice.CustomerId = customer.id;
        this.selectedDevice.ResellerId = customer.ResellerId;
        axios
          .post("/admin/device/insert", {
            selectedDevice: this.selectedDevice,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.devicesOfSelectedCustomer.push(selectedDevice);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteDevice(ticket) {
        axios.post("/admin/device/delete", { device: device }).then((response) => {
          if (response.data.status == 200) {
            const indexOfObject = this.hsComponentStore.devicesOfSelectedCustomer((object) => {
              return object.id === device.id;
            });
            this.hsComponentStore.devicesOfSelectedCustomer.splice(indexOfObject, 1);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
      },
      selectDevice(row, object) {
        var deviceId = object.item.columns.id;
        const indexOfObject = this.hsComponentStore.devicesOfSelectedCustomer((object) => {
          return object.id === device.id;
        });
        this.selectedDevice = this.hsComponentStore.devicesOfSelectedCustomer[indexOfObject];
      },
    },
  };
</script>
