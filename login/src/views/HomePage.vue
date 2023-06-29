<template>
  <div class="ie-fixMinHeight">
    <div class="main">
      <div class="wrap animated fadeIn">
        <img :src="logoURL" class="logo_default" />
        <a href="/register">
          <input type="submit" value="ACCEDI CON EMAIL E PASSWORD" />
          
        </a>
        <div class="row">
          <div class="column">
            <a href="/auth/google" class="fa fa-google"></a>
          </div>
          <div class="column">
            <a href="/auth/facebook" class="fa fa-facebook"></a>
          </div>
        </div>
        <a href="/login_SMS">
          <input type="submit" value="HAI GIA LE CREDENZIALI?" />
        </a>
        <br />
        <p class="info bt">
          Powered by <img class="logo_powered" src="assets/img/logo.png" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { hsStoreWebsurfer } from '@/store/login_Store';
export default {
  name: "HomePage",
  setup(){
    const storeLogin = hsStoreWebsurfer();
    storeLogin.deviceInit();
    return {storeLogin};
  },
  data() {
    return {
      dataFromServer: null,
    };
  },
  computed: {
    logoURL(){
      return process.env.VUE_APP_CUSTOMER_LOGO+ this.storeLogin.customerInfo.id+".jpg"
    }
  },
};
</script>

<style lang="scss" scoped></style>