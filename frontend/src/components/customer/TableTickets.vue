<template>
  <div>
    <v-row class="justify-content-center m-1">
      <v-btn icon="bi bi-plus" @click="addTicket()" />
    </v-row>
    <v-row>
      <v-text-field v-model="search" label="CERCA"></v-text-field>
        <v-data-table
          :headers="headers"
          :items="this.hsComponentStore.ticketsOfSelectedWebsurfer"
          :search="search"
          v-model:items-per-page="itemsPerPage"
          :hide-default-footer="true"
          disable-pagination
        >
         <template v-slot:[`item.state`]="{ item }">
          <v-icon :class="[item.state === 'active' ? 'green--text' : 'red--text']">
          {{ item.state == 'active' ? 'mdi-led-on' : 'mdi-led-off' }}
          </v-icon>
         </template>
          <template v-slot:[`item.emissionDate`]="{ item }">{{
            getFormattedDate(item.raw.emissionDate)
          }}</template>
          <template v-slot:[`item.expirationDate`]="{ item }">{{
            getFormattedDate(item.raw.expirationDate)
          }}</template>
          <template v-slot:[`item.bandwidthProfile`]="{ item }">{{
            getBandwidthProfileDescription(item.raw)
          }}</template>
          <template v-slot:[`item.actions`]="{ item }">
            <i class="bi bi-pen" @click="editTicket(item.raw)"> </i>
            <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
          </template>
          <template #bottom v-if="true != false"></template>
        </v-data-table>
    </v-row>
    <FormTicket
      v-if="dialogEditTicket"
      @exitEditTicket="exitEditTicket"
      @saveTicket="saveTicket"
    />
  </div>
</template>

<script>
import axios from "axios";
import utilityArrays from "@/utils/utilityArrays.js";
import { hsStoreCustomer } from "@/store/storeCustomer.js";
import FormTicket from "@/components/customer/FormTicket.vue";
export default {
  name: "TableTickets",
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
        { title:"STATO TICKET", key:"state"},
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
  mounted() {
    console.log("Selected websurfer is: ", this.hsComponentStore.selectedWebsurfer);
    //LOAD TICKET
    this.hsComponentStore.fetchTicketsByWebsurfer(this.hsComponentStore.selectedWebsurfer);
    console.log(
      "Found tickets: ",
      this.hsComponentStore.ticketsOfSelectedWebsurfer
    );
  },
 methods: {
    addTicket() {
      this.dialogEditTicket = true;
      this.hsComponentStore.selectedTicket = {};
    },
    editTicket(ticket) {
      this.hsComponentStore.selectedTicket = ticket;
      this.dialogEditTicket = true;
    },
    saveTicket(ticket) {
      axios
        .post("/api/ticket/save", {
          ticket: ticket,
        })
        .then(async (response) => {
          if (response.data.status == 200) {
            this.dialogEditTicket = false;
            utilityArrays.updateElementById(
              this.hsComponentStore.ticketsOfSelectedWebsurfer,
              response.data.ticket
            );
          } else {
            this.$emit("saveTicketError");
          }
        });
    },
    deleteTicket(ticket) {
      axios.post("/api/ticket/delete", { ticket: ticket }).then((response) => {
        if (response.data.status == 200) {
          utilityArrays.deleteElementById(
            this.hsComponentStore.ticketsOfSelectedWebsurfer,
            response.data.ticket
          );
        } else {
          utilityArrays.deleteElementById(
            this.hsComponentStore.ticketsOfSelectedWebsurfer,
            response.data.ticket
          );
          this.$emit("deleteTicketError");
        }
      });
    },
    getBandwidthProfileDescription(item) {
      console.log(item);
      //Workaround broken version of mariadb
      if (typeof item.bandwidthProfile === "string")
        item.bandwidthProfile = JSON.parse(item.bandwidthProfile);

      return (
        item.bandwidthProfile.name +
        " (" +
        item.bandwidthProfile.download +
        "K -- " +
        item.bandwidthProfile.upload +
        "K)"
      );
    },
    getFormattedDate(dateIsoString) {
      console.log("Date is", dateIsoString);
      var dateObject = new Date(dateIsoString);
      return dateObject.toLocaleDateString();
    },
    exitEditTicket() {
      this.dialogEditTicket = false;
    },
  },
};
</script>
