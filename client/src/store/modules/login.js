import axios from 'axios';

// const server = 'http://localhost:3000';
const heroku = 'https://frozen-wildwood-55741.herokuapp.com';

export default {
  state: {
    status: false,
    onHome: false,
  },
  getters: {
    getStatus: (state) => state.status,
    onHome: (state) => state.onHome,
  },
  mutations: {
    setStatus: (state, boolean) => {
      state.status = boolean;
    },

    setOnHome: (state, boolean) => {
      state.onHome = boolean;
    },
  },
  actions: {
    async login({ commit }, obj) {
      try {
        const { data } = await axios.post(`${heroku}/login`, obj);
        localStorage.setItem('token', data.token);
        commit('setStatus', true);
      } catch (err) {
        console.log(err.response.data);
      }
    },

    async register({ commit }, obj) {
      const { data } = await axios.post(`${heroku}/register`, obj);
      localStorage.setItem('token', data.token);
      commit('setStatus', true);
    },

    checkStatus({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setStatus', true);
      }
    },
  },
};
