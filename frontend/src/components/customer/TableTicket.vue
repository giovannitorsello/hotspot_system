<template>
  <div>
    <v-row>
      <v-btn icon="fas fa-plus" @click="addTicket()" />
    </v-row>
    <v-row>
      <v-text-field v-model="search" label="CERCA"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="hsComponentStore.ticketsOfSelectedWebsurfer"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :hide-default-header="true"
        :hide-default-footer="true"
      >
        <template v-slot:[`item.bandwidthProfile`]="{ item }">
          {{ getBandwidthProfileName(item) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
        </template>
      </v-data-table>
    </v-row>
    <FormTicket v-if="dialogEditTicket" @exitEditTicket="exitEditTicket()" @saveTicket="saveTicket" />
  </div>
</template>

<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import generateRandomCredentials from "@/utils/random";
  import FormTicket from "@/components/customer/FormTicket.vue";
  export default {
    name: "TableTicket",
    components: { FormTicket },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditTicket: false,
        selectedTicket: {},
        selectedWebsurfer: {},
        search: "",
        headers: [
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
    methods: {
      exitEditTicket() {
        this.dialogEditTicket = false;
      },
      addTicket() {
        this.dialogEditTicket = true;
      },
      saveTicket(ticket) {
        //this.payload.user = this.hsComponentStore.user;
        //this.payload.credentials = generateRandomCredentials();
        axios
          .post("/api/ticket/save", {
            ticket: ticket,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status == 200) {
              utilityArrays.updateElementById(this.hsComponentStore.ticketsOfSelectedWebsurfer, response.data.ticket);
            } else {
            }
          });
      },
      deleteTicket(ticket) {
        axios.post("/api/ticket/delete", { ticket: ticket }).then((response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.ticketsOfSelectedWebsurfer, response.data.ticket);
          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.ticketsOfSelectedWebsurfer, response.data.ticket);
          }
        });
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
    mount() {
      this.selectedWebsurfer = this.hsComponentStore.selectedWebsurfer;
      this.hsComponentStore.devicesOfSelectedCustomer = this.hsComponentStore.fetchTicketsByWebsurfer(this.selectedWebsurfer);
    },
  };
</script>
