import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaigns: [],
    products: [],
    oneProduct: "",
    cart: []
  },
  mutations: {
    getCampaigns(state, payload) {
      state.campaigns = payload;
    },
    getProducts(state, payload) {
      state.products = payload;
    },
    getOne(state, payload) {
      state.oneProduct = payload;
    },
    showCart(state, payload) {
      state.cart = payload;
    }
  },
  actions: {
    async fetchCart({ commit }) {
      try {
        let { data } = await axios.get("/cart", {
          headers: {
            access_token: localStorage.access_token
          }
        });
        commit("showCart", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async fetchCampaigns({ commit }) {
      try {
        let { data } = await axios.get("/campaign");
        commit("getCampaigns", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async fetch({ commit }) {
      try {
        let { data } = await axios.get("/products");
        commit("getProducts", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async fetchOne({ commit }, id) {
      try {
        let { data } = await axios.get(`/products/${id}`);
        commit("getOne", data);
      } catch (error) {
        errorHandler(error);
      }
    }
  },
  getters: {
    carousel(state) {
      return state.campaigns.filter(
        i => i.placement === "Home - Carousel" && i.status === "On Going"
      );
    },
    promo(state) {
      return state.campaigns.filter(
        i => i.placement === "Home - Pop up" && i.status === "On Going"
      );
    },
    homeProduct(state) {
      let products = [];
      for (let i = 0; i <= 5; i++) {
        products.push(state.products[i]);
      }
      return products;
    }
  },
  modules: {}
});
