import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      products: [],
      priceList: [],
      carts: [],
      authenticated: false,
    };
  },
  mutations: {
    getCarts(state) {
      const option = {
        method: 'get',
        headers: { usertoken: localStorage.getItem('usertoken') },
        url: 'https://hidden-cliffs-82328.herokuapp.com/cart',
      };
      axios.get(option)
        .then((data) => {
          data.data.forEach((product) => {
            state.carts.push(product);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    checkLogin(state) {
      if (localStorage.getItem('usertoken')) {
        state.authenticated = true;
      }
    },
  },
  actions: {
    getProducts() {
      this.state.products = [];
      this.commit('getProducts');
    },
    getCarts() {
      this.state.carts = [];
      this.commit('getCarts');
    },
  },
  modules: {
  },
});
