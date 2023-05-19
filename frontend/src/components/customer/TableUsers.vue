<template>
  <div>
    <v-row>
      <v-btn icon="fas fa-plus" @click="addCustomerUser()" />
    </v-row>
    <v-row>
      <v-text-field label="CERCA" v-model="search"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="hsComponentStore.usersOfSelectedCustomer"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :hide-default-footer="true"
        disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-pen" @click="editCustomerUser(item.raw)"> </i>
          <i class="bi bi-trash" @click="deleteCustomerUser(item.raw)"> </i>
        </template>
      </v-data-table>
    </v-row>
    <FormUser v-if="dialogEditUser" @exitEditUser="exitEditUser" @saveCustomerUser="saveCustomerUser" />
  </div>
</template>

<script>
  import axios from "axios";
  import utilityArrays from "@/utils/utilityArrays.js";
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import FormUser from "@/components/customer/FormUser.vue";
  import generateRandomCredentials from "@/utils/random";

  export default {
    name: "TableUsers",
    components: { FormUser },
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        dialogEditUser: false,
        selectUser: {},
        search: "",
        headers: [
          { title: "NOME", key: "firstname" },
          { title: "COGNOME", key: "lastname" },
          { title: "EMAIL", key: "email" },
          { title: "TELEFONO", key: "phone" },
          { title: "USERNAME", key: "username" },
          { title: "Actions", key: "actions" },
        ],
        page: 1,
        itemsPerPage: 10,
      };
    },
    methods: {
      saveCustomerUser(user) {
        user.CustomerId = this.hsComponentStore.loggedCustomer.id;
        user.role = "CUSTOMER";
        axios
          .post("/api/user/save", {
            user: user,
          })
          .then((response) => {
            if (response.data.status == 200) {
              utilityArrays.updateElementById(this.hsComponentStore.usersOfSelectedCustomer, response.data.user);
              this.dialogEditUser = false;
            } else {
              this.$emit("saveUserError");
            }
          });
      },
      deleteCustomerUser(user) {
        axios.post("/api/user/delete", { user: user }).then(async (response) => {
          if (response.data.status == 200) {
            utilityArrays.deleteElementById(this.hsComponentStore.usersOfSelectedCustomer, response.data.user);
            this.$swal(response.data.msg);
          } else {
            utilityArrays.deleteElementById(this.hsComponentStore.usersOfSelectedCustomer, response.data.user);
            this.$swal(response.data.msg);
          }
        });
      },
      editCustomerUser(user) {
        console.log("Edit: ", user);
        if (user && user.id) this.hsComponentStore.selectedUser = user;
        this.dialogEditUser = true;
      },
      addCustomerUser() {
        this.hsComponentStore.selectedUser = {};
        this.dialogEditUser = true;
      },
      exitEditUser() {
        this.dialogEditUser = false;
      },
    },
  };
</script>
