<template>
                <img class="logo_default" :src="logoURL" />
                <h1>Credenziali di accesso</h1>
                  <h4 style="text-align:center">Le tue credenziali stanno arrivando!<br> Controlla i tuoi SMS o la tua EMAIL!</h4> 
                  <form name="login" action="http://10.0.0.1/login" method="post">
                    <label>
                        <img class="ico" src="assets/img/user.svg" />
                        <input type="text" name="username">
                    </label>
                    <label>
                        <img class="ico" src="assets/img/password.svg" />
                        <input type="password" name="password">
                    </label>

                    <input type="hidden" name="dst" :value="dst">

                    <input type="submit" name="login" value="ACCEDI">
                </form>
</template>

<script>
import { hsStoreWebsurfer } from '@/store/login_Store';
export default {
  name: "SuccessPage",
  setup(){
    const storeLogin = hsStoreWebsurfer();
    return {storeLogin};
   },
  data() {
    return {};
  },
  computed: {
    logoURL(){
      return process.env.VUE_APP_CUSTOMER_LOGO+ this.storeLogin.customerInfo.id+".jpg"
    },
    dst(){
        return this.storeLogin.customerDevice.postAuthLandingPage;
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>