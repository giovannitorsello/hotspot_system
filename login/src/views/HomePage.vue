<template>
  <img :src="logoURL" class="logo_default" />
  <router-link to="/register">
    <input type="submit" value="ACCEDI CON EMAIL E PASSWORD" />
  </router-link>
  <div class="row">
    <div class="column">
      <a :href="urlGoogle">
        <img class="logo_powered" src="assets/img/google_logo.png" />
      </a>
    </div>
    <div class="column">
      <a :href="urlFacebook">
              <img class="logo_powered" src="assets/img/facebook_logo.png" />
              </a>
    </div>
  </div>
  <a href="/login_SMS">
    <input type="submit" value="HAI GIA LE CREDENZIALI?" />
  </a>
  <br />
  <p class="info bt">
    Powered by <img class="logo_powered" src="assets/img/logo.png" />
  </p>
</template>

<script>
import { hsStoreWebsurfer } from "@/store/login_Store";
export default {
  name: "HomePage",
  setup() {
    const storeLogin = hsStoreWebsurfer();
    storeLogin.deviceInit();
    return { storeLogin };
  },
  data() {
    return {
      dataFromServer: null,
    };
  },
  computed: {
    logoURL() {
      return (
        process.env.VUE_APP_CUSTOMER_LOGO +
        this.storeLogin.customerInfo.id +
        ".jpg"
      );
    },
    urlGoogle() {
      return process.env.VUE_APP_API_ENDPOINT + "/auth/google";
    },
    urlFacebook() {
      return process.env.VUE_APP_API_ENDPOINT + "/auth/facebook";
    },
  },
};
</script>
