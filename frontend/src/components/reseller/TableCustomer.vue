<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">TUTTI</v-tab>
      <v-tab value="two" color="white">MODIFICA</v-tab>
      <v-tab value="three" color="white">ELIMINA</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-text-field v-model="search" label="CERCA"></v-text-field>
          <v-data-table
            :headers="this.header"
            :items="this.hsComponentStore.customerOfThisReseller"
            :search="search"
            page.sync="page"
            :items-per-page="itemsPerPage"
            :hide-default-footer="true"
            disable-pagination
          >
            <template v-slot:[`item.actions`]="{ item }">
              <i class="bi bi-trash" @click="openDeleteClient(item.raw)"> </i>
              <i class="bi bi-pen" @click="editClient(item.raw)"></i>
            </template>
          </v-data-table>
        </v-window-item>
        <v-window-item value="two">
          <v-card>
            <v-card-title> Modifica cliente </v-card-title>
            <v-tabs v-model="tabSettings" bg-color="primary">
              <v-tab value="customerGeneralSettings">Anagrafica</v-tab>
              <v-tab value="customerContactSettings">Contatti</v-tab>
              <v-tab value="customerBandwidthSettings">Impostazioni bandwidth clienti</v-tab>
              <v-tab value="customerCeoSettings">Impostazioni CEO</v-tab>
              <v-tab value="customerNotes">Annotazioni</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tabSettings">
                <v-window-item value="customerGeneralSettings">
                  <v-text-field v-model="selectedCustomer.companyName" label="Denominazione"></v-text-field>
                  <v-text-field v-model="selectedCustomer.fiscalCode" label="Codice fiscale"></v-text-field>
                  <v-text-field v-model="selectedCustomer.vatCode" label="Partita IVA"></v-text-field>
                  <v-text-field v-model="selectedCustomer.city" label="Comune"></v-text-field>
                  <v-text-field v-model="selectedCustomer.pin" label="Secret pin"></v-text-field>
                  <v-row>
                    <v-col>
                      <v-sheet class="pa-2 ma-1" align="end">
                        <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                        <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item value="customerContactSettings">
                  <v-text-field v-model="selectedCustomer.addressCompany" label="Indirizzo"></v-text-field>
                  <v-text-field v-model="selectedCustomer.email" label="Email"></v-text-field>
                  <v-text-field v-model="selectedCustomer.phone" label="Telefono"></v-text-field>
                  <v-text-field v-model="selectedCustomer.fax" label="Fax"></v-text-field>
                </v-window-item>
                <v-window-item value="customerBandwidthSettings">
                  <v-text-field v-model="selectedCustomer.defaultBandwidth" label="Bandwidth"></v-text-field>
                  <v-textarea
                    v-model="selectedCustomer.bandwidthProfiles"
                    label="Customer Bandwidth (JSON)"
                    placeholder="[{'id':'1', 'name': 'base', 'download': '1000', 'upload': '1000'},{'id':'2', 'name': 'premium', 'download': '2000', 'upload': '2000'},{'id':'3', 'name': 'professional', 'download': '3000', 'upload': '3000'}]"
                  ></v-textarea>
                  <v-row>
                    <v-col>
                      <v-sheet class="pa-2 ma-1" align="end">
                        <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                        <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item value="customerCeoSettings">
                  <v-text-field v-model="selectedCustomer.web" label="Web page"></v-text-field>
                  <v-text-field v-model="selectedCustomer.preAuthLandingPage" label="Pre Auth Landing Page" placeholder="https://www.azienda.it/preAuthTicket.html"></v-text-field>
                  <v-text-field v-model="selectedCustomer.postAuthLandingPage" label="Post Auth Landing Page" placeholder="https://www.azienda.it/postAuthTicket.html"></v-text-field>
                  <v-textarea
                    v-model="selectedCustomer.websurferCustomFields"
                    label="Customer Bandwidth (JSON)"
                    placeholder="[{'id':'1', 'name': 'tavolo'},{'id':'2', 'name': 'stanza'},{'id':'3', 'name': 'mese'}]"
                  >
                  </v-textarea>
                  <v-row>
                    <v-col>
                      <v-sheet class="pa-2 ma-1" align="end">
                        <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                        <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item value="customerNotes">
                  <v-textarea v-model="selectedCustomer.note" label="Note"></v-textarea>
                  <v-row>
                    <v-col>
                      <v-sheet class="pa-2 ma-1" align="end">
                        <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                        <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveWebsurfer(selectedCustomer)"></i>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-window-item>

        <v-window-item value="three">
          <v-card>
            <v-card-title>Conferma eliminazione</v-card-title>
            <v-card-text>
              <p>Vuoi eliminare il cliente "{{ selectedClient.companyName }}"?</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="deleteClient(selectedClient)">Elimina</v-btn>
              <v-btn @click="selectedClient = null">Annulla</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import axios from "axios";
  export default {
    name: "TableCustomer",
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        tabSettings: "customerGeneralSettings",
        search: "",
        tab: "one",
        header: [
          { title: "ID", key: "id" },
          { title: "NOME", key: "companyName" },
          { title: "CODICE FISCALE", key: "fiscalCode" },
          { title: "CITTA", key: "city" },
          { title: "FAX", key: "fax" },
          { title: "INDIRIZZO", key: "addessCompany" },
          { title: "NOTE", key: "note" },
          { title: "TELEFONO", key: "phone" },
          { title: "P.IVA", key: "vatCode" },
          { title: "WEB", key: "web" },
          { title: "PIN", key: "pin" },
          { title: "Reseller", key: "ResellerId" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      totalRecords() {
        return this.hsComponentStore.customerOfThisReseller.length;
      },
      pageCount() {
        return this.totalRecords / this.itemsPerPage;
      },
    },
    props: {},
    methods: {
      goBack() {
        this.selectedCustomer = "";
        this.tab = "one";
      },
      openDeleteClient(client) {
        this.selectedClient = client;
        this.tab = "three";
      },
      deleteClient(client) {
        axios
          .post("/admin/customers/delete", {
            payload: client,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.deleteCustomer(client.id);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      saveWebsurfer(selectedCustomer) {
        axios
          .post("/admin/customers/update", {
            payload: selectedCustomer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.updateCustomer(selectedCustomer);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      editClient(customer) {
        this.selectedCustomer = customer;
        this.tab = "two";
      },
    },
  };
</script>
