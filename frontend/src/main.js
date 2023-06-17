import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "../App.vue";

//VUETIFY DIRECTIVES
import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components: {
    ...components,
    VDataTable,
  },
  directives,
});

import router from "./router/index";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

//Set BaseURL for Axios from .env file
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
//$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
//$axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
createApp(App).use(pinia).use(router).use(VueSweetalert2).use(vuetify).mount("#app");
