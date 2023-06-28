<template>
  <div class="ie-fixMibìnHeight">
        <div class="main">
            <div class="wrap animated fadeIn">
                <img class="logo_default" src="assets/img/logo_ASYTECH.png">
                <h1>Credenziali di accesso</h1>
                <h5>Arrivera in pochi secondi l'sms con le credenziali di accesso</h5>
                <form name="login" action="http://10.0.0.1/login" method="post">
                    <label>
                        <img class="ico" src="assets/img/user.svg" />
                        <input type="text" name="username">
                    </label>
                    <label>
                        <img class="ico" src="assets/img/password.svg" />
                        <input type="password" name="password">
                    </label>


                    <!--input type="hidden" name="domain" value="hotspot.wifinetcom.net"-->

                    <input type="hidden" name="dst" value="http://www.wifinetcom.net/">

                    <input type="submit" name="login" value="ACCEDI">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Login_SMS",
  created() {},
  data() {
    return {
        data(){
        }
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>