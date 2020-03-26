import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VModal,
  render: (h) => h(App),
}).$mount('#app');
