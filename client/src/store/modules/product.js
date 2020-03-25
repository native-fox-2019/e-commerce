import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  state: {
    products: [],
  },
  getters: {
    products: (state) => state.products,
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },

    addProduct: (state, payload) => {
      state.products.push(payload);
    },

    deleteProduct: (state, id) => {
      state.products = state.products.filter((el) => el.id !== id);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const { data } = await axios.get(`${server}/products`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      commit('setProducts', data);
    },

    async addProduct({ commit }, payload) {
      const { data } = await axios.post(`${server}/products`, payload, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      commit('addProduct', data);
    },

    async deleteProduct({ commit }, id) {
      await axios.delete(`${server}/products/${id}`, {
        header: {
          token: localStorage.getItem('token'),
        },
      });

      commit('deleteProduct', id);
    },
  },
};
