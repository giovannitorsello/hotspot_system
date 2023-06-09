<template>
  <v-row class="justify-content-center">
    <v-col cols="auto">
      <v-btn icon="bi bi-plus" @click="addReseller" />
    </v-col>
  </v-row>
  <v-row>
    <v-text-field v-model="search" label="Cerca"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="hsComponentStore.resellersOfSelectedSuperadmin"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :hide-default-footer="true"
      disable-pagination
    >
      <template v-slot:[`item.actions`]="{ item }">
        <i class="bi bi-trash" @click="deleteReseller(item.raw)"> </i>
        <i class="bi bi-pen" @click="editReseller(item.raw)"></i>
      </template>

      <template #bottom v-if="true != false"></template>
    </v-data-table>
  </v-row>
  <FormReseller
    v-if="dialogEditReseller"
    @saveReseller="saveReseller"
    @exitEditReseller="exitEditReseller"
  />
  <DialogConfirm ref="dialogConfirm" />
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>
import utilityArrays from "@/utils/utilityArrays.js";
import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
import FormReseller from "@/components/superadmin/FormReseller.vue";
import DialogConfirm from "@/components/general/DialogConfirm.vue";
import SnackbarMessage from "@/components/general/SnackbarMessage.vue";
import axios from "axios";

export default {
  name: "TableResellers",
  components: { FormReseller, DialogConfirm, SnackbarMessage },
  setup() {
    const hsComponentStore = hsStoreSuperadmin();
    return { hsComponentStore };
  },
  data() {
    return {
      dialogEditReseller: false,
      selectedReseller: {},
      selectedDevice: {},
      tabSettings: "ResellerGeneralSettings",
      search: "",
      headers: [
        { title: "ID", key: "id" },
        { title: "NOME", key: "companyName" },
        { title: "TELEFONO", key: "phone" },
        { title: "EMAIL", key: "email" },
        { title: "P.IVA", key: "vatCode" },
        { title: "CODICE FISCALE", key: "fiscalCode" },
        { title: "CITTA", key: "city" },
        { title: "Actions", key: "actions" },
      ],
      page: 1,
      itemsPerPage: 10,
      dialogAddDevice: false,
    };
  },
  methods: {
    addReseller() {
      console.log("Add Reseller");
      //Reset store object
      this.hsComponentStore.selectedReseller = {};
      this.dialogEditReseller = true;
    },
    editReseller(reseller) {
      this.hsComponentStore.selectedReseller = reseller;
      this.selectedReseller = reseller;
      //Force userame equal to email.
      this.selectedReseller.username = this.selectedReseller.email;
      this.dialogEditReseller = true;
    },
    async deleteReseller(reseller) {
      console.log("Reseller to delete:", reseller);
      var bConfirm = await this.$refs.dialogConfirm.open(
        "Richiesta di conferma",
        "Sei sicuro di cancellare questo reseller, saranno eliminati anche i suoi clienti e ogni altro riferimento."
      );
      if (bConfirm) {
        axios
          .post("/api/reseller/delete", {
            reseller: reseller,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.deleteElementById(
                this.hsComponentStore.resellersOfSelectedSuperadmin,
                reseller
              );
              this.$refs.snackbarMessage.open(response.data.msg, "info");
            } else {
              utilityArrays.deleteElementById(
                this.hsComponentStore.resellersOfSelectedSuperadmin,
                reseller
              );
              this.$refs.snackbarMessage.open(response.data.msg, "error");
            }
          });
      }
    },
    saveReseller(reseller) {
      this.selectedReseller = reseller;
      axios
        .post("/api/reseller/save", {
          reseller: this.selectedReseller,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.selectedReseller = response.data.result;
            utilityArrays.updateElementById(
              this.hsComponentStore.resellersOfSelectedSuperadmin,
              response.data.reseller
            );
            this.dialogEditReseller = false;
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
    },
    exitEditReseller() {
      this.selectedReseller = {};
      this.dialogEditReseller = false;
    },
  },
  mounted() {
    console.log("Reseller is:", this.hsComponentStore.loggedReseller);
    this.selectedReseller = this.hsComponentStore.selectedReseller;
  },
};
</script>
