<template>
  <div>
    <v-row>
      <v-col cols="auto"> <v-btn icon="fas fa-plus" @click="addWebsurfer" /> </v-col>
    </v-row>
    <v-row>
      <v-text-field v-model="search" label="CERCA"></v-text-field>
      <v-data-table :headers="headerField" :items="hsComponentStore.websurfers" :search="search" page.sync="page" :items-per-page="itemsPerPage" @click:row="onRowClick" disable-pagination>
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-trash" title="ELIMINA" @click="editWebsurfer(item.raw)"></i>
          <i class="bi bi-trash" title="ELIMINA" @click="deleteWebsurfer(item.raw)"></i>
        </template>
      </v-data-table>
    </v-row>
    <FormWebsurfer v-if="dialogEditWebsurfer" @exitEditWebsurfer="exitEditWebsurfer" @saveWebsurfer="saveWebsurfer" />
  </div>
</template>

<script>
  import axios from "axios";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import FormWebsurfer from "@/components/reseller/FormWebsurfer.vue";
  import TableTicket from "@/components/reseller/TableTicket.vue";
  export default {
    name: "TableWebsurfer",
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    components: { FormWebsurfer, TableTicket },
    data() {
      return {
        dialogEditWebsurfer: false,
        selectedWebsurfer: {},
        search: "",
        selectedWebsurfer: null,
        page: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      totalRecords() {
        return this.hsComponentStore.customersOfSelectedReseller.length;
      },
      pageCount() {
        return this.totalRecords / this.itemsPerPage;
      },
      headerField() {
        var header = [
          { title: "NOME", key: "firstname" },
          { title: "COGNOME", key: "lastname" },
          { title: "EMAIL", key: "email" },
          { title: "NOTE", key: "note" },
          { title: "TELEFONO", key: "phone" },
          { title: "SOCIAL", key: "typeSocial" },
          { title: "Actions", key: "actions" },
        ];
        return header;
      },
    },
    methods: {
      addWebsurfer() {
        this.hsComponentStore.selectedWebsurfer = {};
        this.dialogEditWebsurfer = true;
      },
      editWebsurfer(websurfer) {
        console.log("Modify websurfer:", websurfer);
        this.hsComponentStore.selectedWebsurfer = websurfer;
        this.selectedWebsurfer = websurfer;
        this.dialogEditWebsurfer = true;
      },
      saveWebsurfer(websurfer) {
        axios
          .post("/api/websurfer/save", {
            websurfer: websurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.updateElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteWebsurfer(websurfer) {
        axios
          .post("/api/websurfer/delete", {
            websurfer: websurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.deleteElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
            } else {
              utilityArrays.deleteElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
              this.$swal(response.data.msg);
            }
          });
      },
      exitEditWebsurfer() {
        this.dialogEditWebsurfer = false;
      },
    },
  };
</script>
