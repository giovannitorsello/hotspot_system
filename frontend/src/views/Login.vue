<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <div id="auth-left">
          <div class="auth-logo">
            <a href="/dashboard"><img src="img/logo_ASYTECH.png" alt="Logo" /></a>
          </div>
          <h1 class="auth-title">LOGIN TICKET</h1>
          <p class="auth-subtitle mb-5"></p>

          <div class="form-group position-relative has-icon-left mb-4">
            <input type="text" class="form-control form-control-xl" placeholder="Username" name="username" v-model="username" required />
            <div class="form-control-icon">
              <i class="bi bi-person"></i>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <input type="password" class="form-control form-control-xl" placeholder="Password" name="password" v-model="password" required />
            <div class="form-control-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
          </div>

          <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5" @click="checkCredentials()">ACCEDI</button>
        </div>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { hsStore } from "@/store/hotspotSystemStore.js";
  export default {
    name: "App",
    setup() {
      const hsComponentStore = hsStore();
      return { hsComponentStore };
    },
    data() {
      return {
        username: "hotel1",
        password: "hotel1",
      };
    },

    methods: {
      async checkCredentials() {
        await this.hsComponentStore.fetchUserProfile(this.username, this.password);

        if (this.hsComponentStore.user.info && this.hsComponentStore.user.info.id && this.hsComponentStore.user.info.id > 0) {
          if (this.hsComponentStore.user.info.role == "SUPERADMIN") this.$router.push("superadmin/dashboard");

          if (this.hsComponentStore.user.info.role == "RESELLER") this.$router.push("reseller/dashboard");

          if (this.hsComponentStore.user.info.role == "HOTEL") this.$router.push("customer/dashboard");
        } else {
          this.$router.push("/");
          this.$swal("Credenziali errate!");
        }
      },
    },
  };
</script>
