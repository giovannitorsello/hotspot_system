<template>
   <div class="ie-fixMibìnHeight">
        <div class="main">
            <div class="wrap animated fadeIn">
                <img class="logo_default" src="/img/logo_ASYTECH.png">
                <h1>Credenziali di accesso</h1>
                <!--  <h5>Arrivera in pochi secondi l'sms con le credenziali di accesso</h5> -->
                <form name="login" action="http://wifi.hotspot.local/login" method="post">
                    <label>
                        <img class="ico" src="/img/user.svg" />
                        <input type="text" name="username">
                    </label>
                    <label>
                        <img class="ico" src="/img/password.svg" />
                        <input type="password" name="password">
                    </label>


                    <!--     <input type="hidden" name="domain" value="hotspot.wifinetcom.net">  -->

                    <input type="hidden" name="dst" value="http://www.google.it/">

                    <input type="submit" name="login" value="ACCEDI">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "SuccessPage",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>