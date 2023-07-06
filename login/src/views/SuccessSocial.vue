<template>
  <img class="logo_default" :src="logoURL" />
  <h1>Ci sei quasi!</h1>
  <form name="login" action="http://10.0.0.1/login" method="post">
    <input type="hidden" name="username" :value="usernameTicket" />
    <input type="hidden" name="password" :value="passwordTicket" />
    <input type="hidden" name="dst" :value="dst" />
    <input type="submit" name="login" value="Sblocca Navigazione" />
  </form>
</template>

<script>
export default {
  name: "SuccessSocial",
  data() {
    return {
      logoURL:"",
      dst:"",
      usernameTicket: "",
      passwordTicket: "",
    };
  },
  mounted(){
    const urlParams = new URLSearchParams(window.location.search);
    this.usernameTicket = urlParams.get("username");
    this.passwordTicket = urlParams.get("password");
    this.logoURL= process.env.VUE_APP_CUSTOMER_LOGO +urlParams.get("id") +".jpg";
    this.dst= urlParams.get("redirect");
  },
};
</script>
