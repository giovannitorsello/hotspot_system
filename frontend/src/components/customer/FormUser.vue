<template>
  <v-dialog v-model="dialogEditUser" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title> Modifica cliente </v-card-title>
      <v-tabs v-model="tabSettings" bg-color="primary">
        <v-tab value="userGeneralSettings">Anagrafica</v-tab>
        <v-tab value="userProfileSettings">Credenziali</v-tab>
        <v-tab value="userNotes">Annotazioni</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tabSettings">
          <v-window-item value="userGeneralSettings">
            <v-text-field v-model="selectedUser.firstname" label="Nome"></v-text-field>
            <v-text-field v-model="selectedUser.lastname" label="Cognome"></v-text-field>
            <v-text-field v-model="selectedUser.email" label="Email"></v-text-field>
            <v-text-field v-model="selectedUser.phone" label="Telefono"></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exitEditUser()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomerUser(selectedUser)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="userProfileSettings">
            <v-text-field v-model="selectedUser.username" label="Login"></v-text-field>
            <v-text-field v-model="selectedUser.password" label="Password"></v-text-field>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exitEditUser()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="changeUserPassword(selectedUser)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="userNotes">
            <v-textarea v-model="selectedUser.note" label="Note"></v-textarea>
            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-1" align="end">
                  <i class="bi bi-arrow-left ma-1" style="font-size: xx-large" @click="exitEditUser()"></i>
                  <i class="bi bi-check-circle ma-1" style="font-size: xx-large" @click="saveCustomerUser(selectedUser)"></i>
                </v-sheet>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  export default {
    name: "FormUser",
    setup() {
      const hsComponentStore = hsStoreCustomer();
      return { hsComponentStore };
    },
    data() {
      return {
        tabSettings: "userGeneralSettings",
        dialogEditUser: true,
        selectedUser: {},
      };
    },
    methods: {
      saveCustomerUser(user) {
        if (!this.selectedUser.username || this.selectedUser.username == "") this.selectedUser.username = this.selectedUser.email;
        if (!this.selectedUser.password || this.selectedUser.password == "") this.selectedUser.password = this.selectedUser.email;
        this.$emit("saveCustomerUser", user);
      },
      changeUserPassword(user) {
        this.$emit("changeCustomerUserPassword", user);
      },
      deleteCustomerUser(user) {
        this.$emit("deleteCustomerUser", user);
      },
      editUser(user) {
        console.log("Selected customer is:", user);
        this.hsComponentStore.selectedUser = user;
      },
      exitEditUser() {
        this.$emit("exitEditUser");
      },
    },
    mounted() {
      this.selectedUser = this.hsComponentStore.selectedUser;
      this.selectedUser.role = "CUSTOMER";
      this.dialogEditUser = true;
    },
  };
</script>
