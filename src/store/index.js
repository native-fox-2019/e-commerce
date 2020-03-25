import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: localStorage.jwt,
    products: null,
    cart: []
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt;
      localStorage.jwt = jwt;
    },
    deleteJwt(state) {
      state.jwt = null;
      delete localStorage.jwt;
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, product) {
      if (state.products === null) {
        state.products = [product];
      } else {
        const id = product.id;
        const index = state.products.findIndex(p => p.id === id);
        if (index !== -1) {
          state.products[index] = product;
        }
      }
    },
    addToCart(state, product) {
      if (!state.cart.find(p => p.id === product.id)) {
        state.cart.push(product);
      }
    },
    removeFromCart(state, product) {
      state.cart = state.cart.filter(p => p.id !== product.id);
    }
  },
  actions: {},
  modules: {}
});
