import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import { BModal, VBModal } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.component('b-modal', BModal)
Vue.directive('b-modal', VBModal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
