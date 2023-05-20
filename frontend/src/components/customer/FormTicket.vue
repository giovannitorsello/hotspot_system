<template>
  <v-dialog v-model="dialogEditTicket" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>Generazione Tickets</v-card-title>
      <v-card-text>
        <v-select v-model="locationRouter" :items="locationRouters" item-title="addressSetup" return-object label="Sede"></v-select>
        <v-select
          v-model="selectedTicket.bandwidthProfile"
          v-on:change="onUpdateBandwidthProfile()"
          :items="locationRouter.bandwidthProfiles"
          item-title="name"
          return-object
          label="PROFILO"
        ></v-select>
        <v-text-field v-model="selectedTicket.note" label="NOTE"></v-text-field>
        <VueDatePicker v-model="periodValidity" :format="dd / MM / yyyy - dd / MM / yyyy" @update:model-value="selectPeriodValidity()" range :start-date="new Date()" label="PERIODO" />
        <v-row>
          <v-col>
            <v-sheet class="pa-2 ma-1" align="end">
              <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exitEditTicket()"></i>
              <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveTicket(selectedTicket)"></i>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import VueDatePicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  export default {
    name: "FormTicket",
    components: { VueDatePicker },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditTicket: true,
        locationRouter: {},
        selectedCustomer: {},
        selectedWebsurfer: {},
        selectedDevice: {},
        selectedTicket: {},
        locationRouters: [],
        periodValidity: {},
      };
    },
    mounted() {
      this.dialogEditTicket = true;
      this.selectedWebsurfer = this.hsComponentStore.selectedWebsurfer;
      this.selectedCustomer = this.hsComponentStore.loggedCustomer;
      this.selectedTicket = this.hsComponentStore.selectedTicket;
      this.locationRouters = this.hsComponentStore.devicesOfSelectedCustomer;
      this.locationRouter = this.locationRouters[0];
      console.log("available devices are: ", this.hsComponentStore.devicesOfSelectedCustomer);
    },
    methods: {
      saveTicket() {
        this.selectedTicket.WebsurferId = this.selectedWebsurfer.id;
        this.selectedTicket.CustomerId = this.selectedCustomer.id;
        this.$emit("saveTicket", this.selectedTicket);
      },
      deleteTicket(ticket) {
        this.$emit("deleteTicket", ticket);
      },
      editTicket(ticket) {
        console.log("Selected ticket is:", ticket);
        this.hsComponentStore.selectedTicket = ticket;
      },
      onUpdateBandwidthProfile() {
        console.log("Ticket state is: ", this.hsComponentStore.selectedTicket);
      },
      selectPeriodValidity() {
        console.log(this.periodValidity);
        if (this.periodValidity.length === 2) {
          this.hsComponentStore.selectedTicket.emissionDate = this.periodValidity[0];
          this.hsComponentStore.selectedTicket.firstUse = this.periodValidity[0];
          this.hsComponentStore.selectedTicket.expirationDate = this.periodValidity[1];
          this.hsComponentStore.selectedTicket.expirationUsageDate = this.periodValidity[1];
          var Difference_In_Time = this.periodValidity[1].getTime() - this.periodValidity[0].getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          this.hsComponentStore.selectedTicket.durationDays = Difference_In_Days;
          this.hsComponentStore.selectedTicket.state = "active";
          console.log("Ticket state is: ", this.hsComponentStore.selectedTicket);
        }
      },
      exitEditTicket() {
        this.$emit("exitEditTicket");
      },
    },
  };
</script>
