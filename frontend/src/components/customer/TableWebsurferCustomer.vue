<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="#435ebe">
      <v-tab value="one" color="white">TUTTI</v-tab>
      <v-tab value="two" :hidden="disableTab" color="white">MODIFICA</v-tab>
      <v-tab value="three" :hidden="disableTab" color="white">ELIMINA</v-tab>
      <v-tab value="four" :hidden="disableTab" color="white">TICKET</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-text-field v-model="search" label="CERCA"></v-text-field>

          <v-data-table
            :headers="header"
            :items="this.hsComponentStore.websurfersOfSelectedCustomer"
            :search="search"
            page.sync="page"
            :items-per-page="itemsPerPage"
            @click:row="onRowClick"
            disable-pagination
          >
            <template v-slot:[`item.actions`]="{ item }">
              <i class="bi bi-trash" title="ELIMINA" @click="deleteWebsurfer(item.raw)"> </i>
            </template>
          </v-data-table>
        </v-window-item>

        <v-window-item value="two">
          <v-card>
            <v-card-title> Modifica WEBSURFER </v-card-title>
            <v-card-text>
              <v-text-field v-model="selectedWebsurfer.firstname" label="NOME"></v-text-field>
              <v-text-field v-model="selectedWebsurfer.lastname" label="COGNOME"></v-text-field>
              <v-text-field v-model="selectedWebsurfer.email" label="EMAIL"></v-text-field>
              <v-text-field v-model="selectedWebsurfer.note" label="NOTE"></v-text-field>
              <v-text-field v-model="selectedWebsurfer.phone" label="TELEFONO"></v-text-field>
              <v-row>
                <v-col>
                  <v-sheet class="pa-2 ma-1" align="end">
                    <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" title="INDIETRO" @click="goBack()"></i>
                    <i class="bi bi-check-circle ma-1" style="font-size: xx-large" title="SALVA" @click="saveWebsurfer()"></i>
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
              <p>Vuoi eliminare il websurfer "{{ selectedWebsurfer.firstname }}"?</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="deleteWebsurfer(this.selectedWebsurfer)">Elimina</v-btn>
              <v-btn @click="tab = 'one'">Annulla</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>

        <v-window-item value="four">
          <v-card>
            <TableTicketCustomer />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import axios from "axios";
  import TableTicketCustomer from "@/components/customer/TableTicketCustomer.vue";
  export default {
    name: "TableWebsurfer",
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    components: { TableTicketCustomer },
    data() {
      return {
        search: "",
        tab: "one",
        selectedWebsurfer: null,
        header: [
          { title: "ID", key: "id" },
          { title: "NOME", key: "firstname" },
          { title: "COGNOME", key: "lastname" },
          { title: "EMAIL", key: "email" },
          { title: "TELEFONO", key: "phone" },
          { title: "NOTE", key: "note" },
          { title: "BANDA", key: "bandwidthProfile" },
          { title: "SOCIAL", key: "typeSocial" },
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
      disableTab() {
        if (this.tab != "one" && this.selectedWebsurfer != null) {
          return false;
        } else {
          return true;
        }
      },
    },

    methods: {
      onRowClick(cellData, item) {
        this.selectedWebsurfer = item.item.raw;
        this.tab = "two";
      },
      editWebsurfer(websurfer) {
        console.log(websurfer);
        this.selectedWebsurfer = websurfer;
        this.tab = "two";
      },
      alertDeleteWebsurfer(websurfer) {
        this.selectedWebsurfer = websurfer;
        this.tab = "three";
      },
      goBack() {
        this.selectedWebsurfer = "";
        this.tab = "one";
      },
      saveWebsurfer() {
        axios
          .post("/admin/websurfers/update", {
            payload: this.selectedWebsurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.updateWebsurfer(this.selectedWebsurfer);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteWebsurfer(selectedWebsurfer) {
        axios
          .post("/admin/websurfers/delete", {
            websurfer: selectedWebsurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.deleteWebsurfer(selectedWebsurfer.id);
              this.tab = "one";
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
    },
  };
</script>
