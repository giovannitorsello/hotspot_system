<template>
  <div>
    <SidebarCustomer />
    <div id="main">
      <div class="page-heading">
        <h3>GESTIONE UTENTI</h3>
      </div>
      <TableUsers />
    </div>
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>
import axios from "axios";
import { hsStoreCustomer } from "@/store/storeCustomer.js";
import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
import TableUsers from "@/components/customer/TableUsers.vue";
import SnackbarMessage from "@/components/general/SnackbarMessage.vue";
export default {
  name: "Users",
  components: { SidebarCustomer, TableUsers, SnackbarMessage },
  setup() {
    const hsComponentStore = hsStoreCustomer();
    return { hsComponentStore };
  },
  data() {
    return {};
  },
  methods: {
    saveUser(user) {
      user.CustomerId = this.hsComponentStore.loggedCustomer.id;
      user.ResellerId = this.hsComponentStore.loggedCustomer.ResellerId;
      axios.post("/api/user/save", { user: user }).then((response) => {
        if (response.data.status == 200) {
          this.hsComponentStore.addUser(response.data.result);
          this.$refs.snackbarMessage.open(response.data.msg, "info");
        } else {
          this.$refs.snackbarMessage.open(response.data.msg, "error");
        }
      });
    },
    deleteUser(user) {
      axios.post("/api/user/delete", { user: user }).then((response) => {
        if (response.data.status == 200) {
          this.$refs.snackbarMessage.open(response.data.msg, "info");
        } else {
          this.$refs.snackbarMessage.open(response.data.msg, "error");
        }
      });
    },
  },
};
</script>
