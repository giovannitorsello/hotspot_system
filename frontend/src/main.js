import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "../App.vue";

//VUETIFY DIRECTIVES
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import router from "./router/index";
import store from "./store/index";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const pinia = createPinia();

//Set BaseURL for Axios from .env file
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
//$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
//$axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

createApp(App).use(store).use(pinia).use(router).use(VueSweetalert2).use(vuetify).mount("#app");
