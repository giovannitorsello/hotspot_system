<template>
  <v-window v-model="tab">
    <v-window-item value="one">
      <v-text-field v-model="search" label="CERCA"></v-text-field>
      <v-data-table
        :headers="this.header"
        :items="this.hsComponentStore.resellersOfSelectedSuperadmin"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-trash" @click="openDeleteReseller(item.raw)"> </i>
          <i class="bi bi-pen" @click="editReseller(item.raw)"></i>
        </template>
      </v-data-table>
    </v-window-item>
    <v-window-item value="two">
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="resellerGeneralSettings">Anagrafica</v-tab>
        <!--   <v-tab value="resellerCredentials">Credenziali</v-tab> -->
      </v-tabs>
      <v-window v-model="tabSettings">
        <v-window-item value="resellerGeneralSettings">
          <v-card>
            <v-card-title> Modifica RESELLER </v-card-title>
            <v-card-text>
              <v-text-field v-model="selectedReseller.companyName" label="Denominazione"></v-text-field>
              <v-text-field v-model="selectedReseller.fiscalCode" label="Codice fiscale"></v-text-field>
              <v-text-field v-model="selectedReseller.vatCode" label="Partita IVA"></v-text-field>
              <v-text-field v-model="selectedReseller.city" label="Comune"></v-text-field>
              <v-text-field v-model="selectedReseller.fax" label="Fax"></v-text-field>
              <v-text-field v-model="selectedReseller.web" label="Web page"></v-text-field>
              <v-text-field v-model="selectedReseller.note" label="Note"></v-text-field>
              <v-text-field v-model="selectedReseller.addessCompany" label="Indirizzo"></v-text-field>
              <v-text-field v-model="selectedReseller.phone" label="Telefono"></v-text-field>
              <v-text-field v-model="selectedReseller.email" label="Email"></v-text-field>
              <v-text-field label="Password iniziale" v-model="selectedReseller.password"></v-text-field>

              <v-row>
                <v-col>
                  <v-sheet class="pa-2 ma-1" align="end">
                    <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="goBack()"></i>
                    <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveReseller(selectedReseller)"></i>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-window-item>
    <v-window-item value="three">
      <v-card>
        <v-card-title>Conferma eliminazione</v-card-title>
        <v-card-text>
          <p>Vuoi eliminare il cliente "{{ selectedReseller.companyName }}"?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteReseller(selectedReseller)">Elimina</v-btn>
          <v-btn @click="selectedReseller = null">Annulla</v-btn>
        </v-card-actions>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script>
  import { hsStoreSuperadmin } from "@/store/storeSuperadmin.js";

  import axios from "axios";
  export default {
    name: "TableReseller",
    setup() {
      const hsComponentStore = hsStoreSuperadmin();
      return { hsComponentStore };
    },
    data() {
      return {
        tabSettings: "resellerGeneralSettings",
        selectedReseller: "",
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
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      totalRecords() {
        return this.hsComponentStore.resellersOfSelectedSuperadmin.length;
      },
      pageCount() {
        return this.totalRecords / this.itemsPerPage;
      },
    },
    props: {},
    methods: {
      goBack() {
        this.selectedReseller = "";
        this.tab = "one";
      },
      openDeleteReseller(reseller) {
        this.selectedReseller = reseller;
        this.tab = "three";
      },
      deleteReseller(reseller) {
        axios
          .post("/admin/reseller/delete", {
            payload: reseller,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.deleteReseller(reseller.id);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      saveReseller(selectedReseller) {
        axios
          .post("/api/reseller/save", {
            reseller: selectedReseller,
          })
          .then(async (response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.updateReseller(selectedReseller);
              if (this.selectedReseller.password && this.selectedReseller.password != "") {
                let userToUpdate = { email: this.selectedReseller.email, password: this.selectedReseller.password };
                let changePasswordResult = await axios.post("/api/user/changePassword", { user: userToUpdate });
                console.log("Change password reseller:", changePasswordResult);
                this.$swal(changePasswordResult.data.msg);
              }
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      editReseller(reseller) {
        this.selectedReseller = reseller;
        this.tab = "two";
      },
    },
  };
</script>
