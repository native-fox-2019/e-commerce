import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaigns: [],
    products: []
  },
  mutations: {
    getCampaigns(state, payload) {
      state.campaigns = payload;
    },
    getProducts(state, payload) {
      state.products = payload;
    }
  },
  actions: {
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
    }
  },
  modules: {}
});
