<template>
  <div>
   
    <v-row>
      <v-text-field v-model="search" label="CERCA"></v-text-field>
      <v-data-table
        :headers="headers"
        :items="hsComponentStore.usersOfSelectedReseller"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :hide-default-header="true"
        :hide-default-footer="true"
        disable-pagination
        @click:row="editUser"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <i class="bi bi-pen" @click="editResellerUser(item.raw)"> </i>
          <i class="bi bi-trash" @click="deleteResellerUser(item.raw)"> </i>
        </template>
      </v-data-table>
    </v-row>
    <FormUser
      v-if="dialogEditUser"
      @exitEditUser="exitEditUser"
      @saveResellerUser="saveResellerUser"
      @changeResellerUserPassword="changeResellerUserPassword"
    />
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>
import axios from "axios";
import utilityArrays from "@/utils/utilityArrays.js";
import { hsStoreReseller } from "@/store/storeReseller.js";
import FormUser from "@/components/reseller/FormUser.vue";
import SnackbarMessage from "../general/SnackbarMessage.vue";
import generateRandomCredentials from "@/utils/random";
export default {
  name: "TableUser",
  components: { FormUser,SnackbarMessage },
  setup() {
    const hsComponentStore = hsStoreReseller();
    return { hsComponentStore };
  },
  data() {
    return {
      dialogEditUser: false,
      selectedUser: {},
      search: "",
      headers: [
        { title: "NOME", key: "firstname" },
        { title: "USERNAME", key: "username" },
        { title: "TELEFONO", key: "phone" },
        { title:"RUOLO", key:"role"},
        { title: "ACTIONS", key: "actions" },
      ],
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    saveResellerUser(user) {
      user.ResellerId = this.hsComponentStore.loggedReseller.id;
      user.role = "RESELLER";
      axios
        .post("/api/user/save", {
          user: user,
        })
        .then((response) => {
          if (response.data.status == 200) {
            utilityArrays.updateElementById(
              this.hsComponentStore.usersOfSelectedReseller,
              response.data.user
            );
            this.dialogEditUser = false;
          } else {
            this.$emit("saveUserError");
          }
        });
    },
    deleteResellerUser(user) {
      axios.post("/api/user/delete", { user: user }).then(async (response) => {
        if (response.data.status == 200) {
          utilityArrays.deleteElementById(
            this.hsComponentStore.usersOfSelectedReseller,
            response.data.user
          );
          this.$refs.snackbarMessage.open(response.data.msg, "info");
        } else {
          utilityArrays.deleteElementById(
            this.hsComponentStore.usersOfSelectedReseller,
            response.data.user
          );
          this.$refs.snackbarMessage.open(response.data.msg, "error");
        }
      });
    },
    changeResellerUserPassword(user) {
      axios
        .post("/api/user/changePassword", {
          user: user,
        })
        .then((response) => {
          if (response.data.status == 200) {
            console.log("Password changed");
            this.$refs.snackbarMessage.open(response.data.msg, "info");
            this.dialogEditUser= false;
          } else {
            console.log("Change password error");
          }
        });
    },
    editResellerUser(user) {
      this.hsComponentStore.selectedUser = user;
      this.dialogEditUser = true;
    },
    addResellerUser() {
      this.hsComponentStore.selectedUser = {};
      this.dialogEditUser = true;
    },
    exitEditUser() {
      this.dialogEditUser = false;
    },
  },
};
</script>
