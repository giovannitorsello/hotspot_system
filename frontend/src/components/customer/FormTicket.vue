<template>
  <v-dialog v-model="dialogEditTicket" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica Ticket </v-card-title>
      <v-card-text>
        <v-text-field v-model="selectedTicket.serialNumber" label="N.SERIALE"></v-text-field>
        <v-text-field v-model="selectedTicket.login" label="USERNAME"></v-text-field>
        <v-text-field v-model="selectedTicket.password" label="PASSWORD"></v-text-field>
        <v-text-field v-model="selectedTicket.durationDays" label="DURATA (GG)"></v-text-field>
        <v-text-field v-model="selectedTicket.profile" label="PROFILO"></v-text-field>
        <v-text-field v-model="selectedTicket.state" label="STATO"></v-text-field>
        <v-row>
          <v-col>
            <v-sheet class="pa-2 ma-1" align="end">
              <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exitEditTicket()"></i>
              <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveTicket()"></i>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import axios from "axios";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreCustomer } from "@/store/storeCustomer.js";

  export default {
    name: "FormTicket",
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditTicket: true,
        selectedTicket: {},
      };
    },
    mounted() {
      this.dialogEditTicket = true;
      this.selectedTicket = this.hsComponentStore.selectedTicket;
    },
    methods: {
      saveTicket() {
        this.$emit("saveTicket", this.selectedTicket);
      },
      deleteTicket(ticket) {
        this.$emit("deleteTicket", ticket);
      },
      editTicket(ticket) {
        console.log("Selected ticket is:", ticket);
        this.hsComponentStore.selectedTicket = ticket;
      },
      exitEditTicket() {
        this.$emit("exitEditTicket");
      },
    },
  };
</script>
