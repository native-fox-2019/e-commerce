import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  state: {
    status: false,
  },
  getters: {
    getStatus: (state) => state.status,
  },
  mutations: {
    setStatus: (state, boolean) => {
      state.status = boolean;
    },
  },
  actions: {
    async login({ commit }, obj) {
      console.log(obj);
      const { data } = await axios.post(`${server}/login`, obj);
      localStorage.setItem('token', data.token);
      commit('setStatus', true);
    },

    async register({ commit }, obj) {
      const { data } = await axios.post(`${server}/register`, obj);
      localStorage.setItem('token', data.token);
      commit('setStatus', true);
    },
  },
};
