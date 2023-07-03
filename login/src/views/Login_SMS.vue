<template>
                <img :src="logoURL" class="logo_default" />
                <h4 style="text-align:center">Se ti sono state fornite già le credenziali, inseriscile qui!</h4>
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
  name: "Login_SMS",
  setup(){
    const storeLogin = hsStoreWebsurfer();
    storeLogin.deviceInit();
    return {storeLogin};
  },
  data() {
    return {
        data(){
        }
    };
  },
  computed:{
    logoURL(){
      return process.env.VUE_APP_CUSTOMER_LOGO+ this.storeLogin.customerInfo.id+".jpg"
    },
    dst(){
        return this.storeLogin.customerDevice.postAuthLandingPage;
    }
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>