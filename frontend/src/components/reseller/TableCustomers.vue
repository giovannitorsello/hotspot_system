<template>
  <v-row class="justify-content-center">
    <v-col cols="auto"> <v-btn icon="bi bi-plus" @click="addCustomer" /> </v-col>
  </v-row>
  <v-row>
    <v-text-field v-model="search" label="Cerca"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="hsComponentStore.customersOfSelectedReseller"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :hide-default-footer="true"
      disable-pagination
    >
      <template v-slot:[`item.actions`]="{ item }">
        <i class="bi bi-trash" @click="deleteCustomer(item.raw)"> </i>
        <i class="bi bi-pen" @click="editCustomer(item.raw)"></i>
      </template>
      <template #bottom v-if="true != false"></template>
    </v-data-table>
  </v-row>
  <FormCustomer v-if="dialogEditCustomer" @exitEditCustomer="exitEditCustomer" @saveCustomer="saveCustomer" />
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import FormCustomer from "@/components/reseller/FormCustomer.vue";
  import TableCustomers from "@/components/reseller/TableCustomers.vue";
  import SnackbarMessage from "../general/SnackbarMessage.vue";

  import axios from "axios";
  export default {
    name: "TableCustomers",
    components: { FormCustomer, TableCustomers, SnackbarMessage },
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditCustomer: false,
        dialogEditDevice: false,
        selectedReseller: {},
        selectedCustomer: {},
        selectedDevice: {},
        tabSettings: "customerGeneralSettings",
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
      addCustomer() {
        this.hsComponentStore.selectedCustomer = {};
        this.dialogEditCustomer = true;
      },
      editCustomer(customer) {
        console.log("Modify customer:", customer);
        this.hsComponentStore.selectedCustomer = customer;
        this.selectedCustomer = customer;
        this.dialogEditCustomer = true;
      },
      deleteCustomer(customer) {
        console.log("Customer to delete:", customer);
        axios
          .post("/api/customer/delete", {
            customer: customer,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.deleteElementById(this.hsComponentStore.customersOfSelectedReseller, customer);
              this.$refs.snackbarMessage.open(response.data.msg, "info");
            } else {
              utilityArrays.deleteElementById(this.hsComponentStore.customersOfSelectedReseller, customer);
              this.$refs.snackbarMessage.open(response.data.msg, "error");
            }
          });
      },
      saveCustomer(customer) {
        customer.ResellerId = this.selectedReseller.id;
        axios
          .post("/api/customer/save", {
            customer: customer,
          })
          .then(async (response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.selectedCustomer = response.data.customer;
              utilityArrays.updateElementById(this.hsComponentStore.customersOfSelectedReseller, response.data.customer);
              this.dialogEditCustomer = false;
              this.$refs.snackbarMessage.open(response.data.msg, "info");
            } else {
              this.$refs.snackbarMessage.open(response.data.msg, "error");
            }
          });
      },
      exitEditCustomer() {
        this.selectedCustomer = {};
        this.dialogEditCustomer = false;
      },
    },
    async mounted() {
      console.log("Logged reseller is:", this.hsComponentStore.loggedReseller);
      this.selectedReseller = this.hsComponentStore.loggedReseller;
      this.selectedCustomer = this.hsComponentStore.selectedCustomer;
      //await this.hsComponentStore.fetchCustomersByReseller(this.hsComponentStore.loggedReseller);
    },
  };
</script>
