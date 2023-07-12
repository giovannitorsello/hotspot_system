<template>
  <div>
    <v-row class="justify-content-center m-3">
      <v-btn icon="bi bi-plus" @click="addWebsurfer()" />
    </v-row>
    <v-row>
      <v-text-field label="CERCA" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="hsComponentStore.websurfersOfSelectedCustomer"
        :search="search"
        :items-per-page="itemsPerPage"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-trash" @click="deleteWebsurfer(item.raw)"> </i>
          <i class="bi bi-pen" @click="editWebsurfer(item.raw)"></i>
        </template>
        <template #bottom v-if="true != false"></template>
      </v-data-table>
    </v-row>
    <FormWebsurfer v-if="dialogEditWebsurfer" @exitEditWebsurfer="exitEditWebsurfer" @saveWebsurfer="saveWebsurfer" />
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>
  import axios from "axios";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import FormWebsurfer from "@/components/customer/FormWebsurfer.vue";
  import SnackbarMessage from "../general/SnackbarMessage.vue";
  export default {
    name: "TableWebsurfer",
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    components: { FormWebsurfer,SnackbarMessage },
    data() {
      return {
        dialogEditWebsurfer: false,
        selectedWebsurfer: {},
        selectedCustomer: {},
        search: "",
        headers: [
          {title:"ID", key:"id"},
          { title: "NOME", key: "firstname" },
          { title: "COGNOME", key: "lastname" },
          { title: "EMAIL", key: "email" },
          { title: "TELEFONO", key: "phone" },
          { title: "SOCIAL", key: "typeSocial" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    mounted() {
      this.selectedWebsurfer = this.hsComponentStore.selectedWebsurfer;
    },
    methods: {
      saveWebsurfer(websurfer) {
        websurfer.CustomerId = this.hsComponentStore.loggedCustomer.id;
        axios
          .post("/api/websurfer/save", {
            websurfer: websurfer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.updateElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
              this.dialogEditWebsurfer = false;
            } else {
              this.$emit("saveUserError");
            }
          });
      },
      deleteWebsurfer(websurfer) {
        axios.post("/api/websurfer/delete", { websurfer: websurfer }).then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
            this.$refs.snackbarMessage.open(response.data.msg, "info");

          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.websurfersOfSelectedCustomer, response.data.websurfer);
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
      },
      editWebsurfer(websurfer) {
        console.log("Edit: ", websurfer);
        if (websurfer && websurfer.id) this.hsComponentStore.selectedWebsurfer = websurfer;
        this.dialogEditWebsurfer = true;
      },
      addWebsurfer() {
        this.hsComponentStore.selectedWebsurfer = {};
        this.dialogEditWebsurfer = true;
      },
      exitEditWebsurfer() {
        this.dialogEditWebsurfer = false;
      },
    },
  };
</script>
