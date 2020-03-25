import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: '',
    baseUrl: 'http://localhost:3003',
    isLogin: false,
  },
  mutations: {
    setPage(state, data) {
      state.page = data;
    },
    changeIsLogin(state, data) {
      state.isLogin = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
