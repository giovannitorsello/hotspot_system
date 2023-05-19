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
</template>

<script>
  import axios from "axios";
  import { hsStoreCustomer } from "@/store/storeCustomer.js";
  import SidebarCustomer from "@/components/customer/SidebarCustomer.vue";
  import TableUsers from "@/components/customer/TableUsers.vue";
  export default {
    name: "Users",
    components: { SidebarCustomer, TableUsers },
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
        axios
          .post("/api/user/save", {
            user: user,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.hsComponentStore.addUser(response.data.result);
              this.$swal(response.data.msg);
            } else {
              this.$swal(response.data.msg);
            }
          });
      },
      deleteUser(user) {
        axios.post("//api/user/delete", { user: user }).then((response) => {
          if (response.data.status == 200) {
            this.$swal(response.data.msg);
          } else {
            this.$swal(response.data.msd);
          }
        });
      },
    },
  };
</script>
