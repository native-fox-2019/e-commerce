import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      products: [],
      priceList: [],
      authenticated: false,
    };
  },
  mutations: {
    getProducts(state) {
      axios.get('https://guarded-thicket-66622.herokuapp.com/product')
        .then((data) => {
          data.data.forEach((product) => {
            state.products.push(product);
            state.priceList.push(product.price);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkLogin() {
      if (localStorage.getItem('usertoken')) {
        this.state.authenticated = true;
      }
    },
  },
  actions: {
    getProducts() {
      this.state.products = [];
      this.commit('getProducts');
    },
  },
  modules: {
  },
});
