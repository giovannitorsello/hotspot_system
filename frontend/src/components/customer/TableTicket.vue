<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">Ticket Hotel</v-tab>
      <!--   <v-tab value="two" color="white">MODIFICA</v-tab>
                          <v-tab value="three" color="white">ELIMINA</v-tab> -->
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
              <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
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
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "TableTicket",
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
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
      };
    },
    computed: {},
    props: {},
    methods: {
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
    },
  };
</script>
