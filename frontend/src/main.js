import { createApp } from 'vue'
import App from '../App.vue'
//VUETIFY DIRECTIVES 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

import router from './router/index'
import store from './store/index'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(App).use(store).use(router).use(VueSweetalert2).use(vuetify).mount('#app')
