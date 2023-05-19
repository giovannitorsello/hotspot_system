<template>
  <div>
    <v-text-field label="CERCA"></v-text-field>
    <v-data-table
      :headers="headerField"
      :items="hsComponentStore.ticketsOfAllCustomers"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :hide-default-header="true"
      :hide-default-footer="true"
      disable-pagination
    >
      <template v-slot:[`item.actions`]="{ item }">
        <i class="bi bi-trash" @click="deleteTicket(item.raw)"> </i>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { hsStoreReseller } from "@/store/storeReseller.js";
  import generateRandomCredentials from "@/utils/random";
  export default {
    name: "TableTicket",
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        selectedTicket: "",
        search: "",
        header: [
          { title: "ID", key: "id" },
          { title: "DATA EMISSIONE", key: "emissionDate" },
          { title: "DATA SCADENZA", key: "expirationDate" },
          { title: "LOGIN", key: "login" },
          { title: "PASSWORD", key: "password" },
          { title: "CUSTOMER", key: "CustomerId" },
          { title: "UTENTE", key: "WebsurferId" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    computed: {},
    props: {},
    methods: {
      insertTicket() {
        this.payload.user = this.hsComponentStore.user;
        this.payload.credentials = generateRandomCredentials();
        axios
          .post("/admin/tickets/insert", {
            payload: this.payload,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status == 200) {
              this.hsComponentStore.addTicket(response.data.result);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteTicket(ticket) {
        axios.post("/admin/tickets/delete", { payload: ticket }).then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.deleteTicket(ticket.id);
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msg);
          }
        });
      },
    },
  };
</script>
