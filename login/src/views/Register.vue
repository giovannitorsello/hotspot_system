<template>
      <div class="ie-fixMinHeight">
        <div class="main">
            <div class="wrap animated fadeIn">
                <img class="logo_default" src="/img/logo_ASYTECH.png" >
                <form method="POST" action="/auth/register">

                    <label>
                        <h1>EMAIL AND PASSWORD</h1>
                    </label>
                    <label>
                        <img class="ico" src="/img/user.svg" />
                        <input name="firstname" type="text" placeholder="Nome" required />
                    </label>
                    <label>
                        <img class="ico" src="/img/user.svg" />
                        <input name="lastname" type="text"  placeholder="Cognome" required/>
                    </label>
    
                    <label>
                        <img class="ico" src="/img/email.png" />
                        <input name="email" type="email"  placeholder="Email" required/>
                    </label>
    
                    <label>
                        <img class="ico" src="/img/phone-call.png" />
                        <input name="phone" type="text" placeholder="Telefono (per ricevere i codici di accesso)" required/>
                    </label>
    
                    <label>
                        <input type="submit" value="CONTINUA CON EMAIL E PASSWORD" />
                    </label>

                </form>
                <br>
                <p class="info bt">Powered by <img class="logo_powered" src="/img/logo.png"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RegisterPage",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>