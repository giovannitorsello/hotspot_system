<template>
        <img class="logo_default" :src="logoURL" />
          <label>
            <h1>EMAIL AND PASSWORD</h1>
          </label>
          <label>
            <img class="ico" src="assets/img/user.svg" />
            <input name="firstname" required type="text" placeholder="Nome" v-model="newUser.firstname"  />
          </label>
          <label>
            <img class="ico" src="assets/img/user.svg" />
            <input name="lastname" type="text" placeholder="Cognome" required v-model="newUser.lastname"  />
          </label>

          <label>
            <img class="ico" src="assets/img/email.png" />
            <input name="email" type="email" placeholder="Email" required v-model="newUser.email"  />
          </label>

          <label>
            <img class="ico" src="assets/img/phone-call.png" />
            <input
              name="phone"
              type="text"
              placeholder="Telefono (per ricevere i codici di accesso)"
              v-model="newUser.phone"
              required
            />
          </label>
          <label>
            <input type="submit" @click="register()" :hidden="isValid" value="REGISTRATI" />
          </label>
        <br />
        <p class="info bt">
          Powered by <img class="logo_powered" src="assets/img/logo.png" />
        </p>
</template>

<script>
import { hsStoreWebsurfer } from '@/store/login_Store';
import axios from 'axios';
export default {
  name: "RegisterPage",
 setup(){
    const storeLogin = hsStoreWebsurfer();
    return {storeLogin};
   },
  data() {
    return {
      newUser:{}
    };
  },
  mounted(){
    this.storeLogin.newWebsurfer = this.newUser;
  },
  computed: {
    logoURL(){
      return process.env.VUE_APP_CUSTOMER_LOGO+ this.storeLogin.customerInfo.id+".jpg"
    },
    isValid(){
      if(this.newUser.firstname != null && this.newUser.lastname != null && this.newUser.email != null && this.newUser.phone != null ){
        return false
      }else{
        return true
      }
    }
  },
  methods: {
   async register(){
     const res = await axios.post("/auth/register",{user :this.newUser, customer: this.storeLogin.customerInfo,device: this.storeLogin.customerDevice});
     if(res.data.status == 200 ){
      this.$router.push("/success");
     }
     console.log(res);
    },
    checkData(){
      console.log(this.newUser);
    }
  },
};
</script>
