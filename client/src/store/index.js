import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: '',
    baseUrl: 'https://safe-citadel-27291.herokuapp.com',
    isLogin: false,
    name: '',
  },
  mutations: {
    setPage(state, data) {
      state.page = data;
    },
    changeIsLogin(state, data) {
      state.isLogin = data;
    },
    setName(state, data) {
      state.name = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
