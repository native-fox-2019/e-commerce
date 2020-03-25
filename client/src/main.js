import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import axios from "axios";
Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:3000"
});
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
