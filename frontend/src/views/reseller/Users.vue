<template>
  <div>
    <SidebarReseller />
    <div id="main">
      <div class="page-heading">
        <h3>ACCESSI AL SISTEMA</h3>
      </div>
      <TableUsers />
    </div>
  </div>
  <SnackbarMessage ref="snackbarMessage" />
</template>

<script>

  import { hsStoreReseller } from "@/store/storeReseller.js";
  import axios from "axios";
  import SnackbarMessage from "@/components/general/SnackbarMessage.vue";
  import SidebarReseller from "@/components/reseller/SidebarReseller.vue";
  import TableUsers from "@/components/reseller/TableUsers.vue";
  export default {
    name: "Users",
    components: { SidebarReseller, TableUsers,SnackbarMessage },
    setup() {
      const hsComponentStore = hsStoreReseller();
      return { hsComponentStore };
    },
    data() {
      return {
        tab: "",
        selectedUser: null,
        search: "",
        page: 1,
        itemsPerPage: 10,
        payload: {
          utente: "",
          role: "",
          password: "",
          CustomerId: "",
        },
      };
    },
    methods: {
      goBack() {
        this.selectedUser = "";
        this.tab = "one";
      },
      openDeleteUser(user) {
        this.selectedUser = user;
        this.tab = "three";
      },
      editUser(user) {
        this.selectedUser = user;
        this.tab = "two";
      },
      insertUser() {
        this.payload.ResellerId = this.hsComponentStore.$state.user.ResellerId;
        axios
          .post("/admin/users/insert", {
            payload: this.payload,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addUser(response.data.result);
              this.$refs.snackbarMessage.open(response.data.msg, "info");
            } else {
              this.$refs.snackbarMessage.open(response.data.msg, "error");
            }
          });
      },
      deleteUser(user) {
        axios.post("/admin/users/delete", { payload: user }).then((response) => {
          if (response.data.status == 200) {
            this.hsComponentStore.deleteUser(user.id);
            this.tab = "one";
            this.$refs.snackbarMessage.open(response.data.msg, "info");
          } else {
            this.$refs.snackbarMessage.open(response.data.msg, "error");
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
