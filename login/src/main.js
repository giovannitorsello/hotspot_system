import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";

import '/public/css/style.css'
import { createPinia } from 'pinia'
import router from './router/index'




const pinia = createPinia();
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

createApp(App).use(pinia).use(router).mount('#app')
