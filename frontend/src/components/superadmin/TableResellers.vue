<template>
  <v-row class="justify-content-center">
    <v-col cols="auto"> <v-btn icon="bi bi-plus" @click="addReseller" /> </v-col>
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
  <FormReseller v-if="dialogEditReseller" @exitEditReseller="exitEditReseller" @saveReseller="saveReseller" />
</template>

<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";
  import FormReseller from "@/components/superadmin/FormReseller.vue";

  import axios from "axios";
  export default {
    name: "TableResellers",
    components: { FormReseller },
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
        this.hsComponentStore.selectedReseller = { id: 0 };
        this.dialogEditReseller = true;
      },
      editReseller(reseller) {
        console.log("Modify Reseller:", reseller);
        this.hsComponentStore.selectedReseller = reseller;
        this.selectedReseller = reseller;
        this.dialogEditReseller = true;
      },
      deleteReseller(reseller) {
        console.log("Reseller to delete:", reseller);
        axios
          .post("/api/reseller/delete", {
            reseller: reseller,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.deleteElementById(this.hsComponentStore.resellersOfSelectedSuperadmin, reseller);
              this.$swal(response.data.msg);
            } else {
              utilityArrays.deleteElementById(this.hsComponentStore.resellersOfSelectedSuperadmin, reseller);
              this.$swal(response.data.msg);
            }
          });
      },
      saveReseller(reseller) {
        this.selectedReseller = reseller;
        axios
          .post("/api/reseller/save", {
            reseller: this.selectedReseller,
          })
          .then(async (response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.selectedReseller = response.data.reseller;
              utilityArrays.updateElementById(this.hsComponentStore.resellersOfSelectedSuperadmin, response.data.reseller);
              this.dialogEditReseller = false;
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
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
