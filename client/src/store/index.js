import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const api = axios.create({
  // baseURL: "http://localhost:3000"
  baseURL: "https://blooming-brook-94817.herokuapp.com"
});
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    products: [],
    carts: [],
    cartTotal: 0,
    histories: []
  },
  mutations: {
    login(state, payload) {
      state.isLogin = localStorage.getItem("token");
      state.name = localStorage.getItem("name");
    },
    logout(state, payload) {
      state.isLogin = null;
      state.name = null;
    },
    products(state, payload) {
      state.products = payload;
    },
    carts(state, payload) {
      state.carts = payload;
      state.cartTotal = payload.length;
    },
    histories(state, payload) {
      state.histories = payload
    }
  },
  actions: {
    getAllProduct(context) {
      api({
        method: "get",
        url: "/products"
      })
        .then(({ data }) => {
          context.commit("products", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getCart(context) {
      api({
        method: "get",
        url: "/carts",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("carts", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getHistory(context) {
      api({
        method: "get",
        url: "/histories",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("histories", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  modules: {}
});
