import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  state: {
    products: [],
    cart: [],
    cartSubtotal: 0,
    isOpen: false,
  },
  getters: {
    products: (state) => state.products,
    cart: (state) => state.cart,
    cartSubtotal: (state) => state.cartSubtotal,
    isOpen: (state) => state.isOpen,
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload;
    },

    setCart: (state, payload) => {
      state.cart = payload;
    },

    addToCart: (state, payload) => {
      state.cart.push(payload);
    },

    openCart: (state, boolean) => {
      state.isOpen = boolean;
    },

    removeFromCart: (state, id) => {
      state.cart = state.cart.filter((el) => el.id !== id);
    },

    setCartSubtotal: (state, payload) => {
      state.cartSubtotal = payload;
    },

    addSubtotal: (state, payload) => {
      state.cartSubtotal += payload;
    },

    filterCart: (state, payload) => {
      const index = state.cart.findIndex((el) => el.id === payload.id);
      state.cart[index].Cart.quantity = payload.quantity;
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

    async fetchCart({ commit }) {
      const { data } = await axios.get(`${server}/carts`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      let subtotal = 0;
      data.forEach((el) => {
        subtotal += el.price * el.Cart.quantity;
      });
      commit('setCart', data);
      commit('setCartSubtotal', subtotal);
    },

    async addToCart({ commit }, id) {
      const { data } = await axios.post(`${server}/carts/product/${id}`, {}, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      await commit('setCart', data);
      let subtotal = 0;
      data.forEach((el) => {
        subtotal += el.price;
      });
      commit('setCartSubtotal', subtotal);
      commit('openCart', true);
    },

    async updateQuantity({ commit }, payload) {
      await axios.put(`${server}/carts/product/${payload.id}`, payload.obj, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      if (payload.status === 'plus') {
        commit('addSubtotal', payload.price);
      } else if (payload.status === 'minus') {
        const negative = -Math.abs(payload.price);
        commit('addSubtotal', negative);
      }
      commit('filterCart', { id: payload.id, quantity: payload.obj.quantity });
    },

    async removeProduct({ commit }, payload) {
      await axios.delete(`${server}/carts/product/${payload.id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      commit('removeFromCart', payload.id);
      const newSubtotal = this.state.product.cartSubtotal - payload.price;
      commit('setCartSubtotal', newSubtotal);
    },

    async checkOut({ commit }, payload) {
      await axios.put(`${server}/products/stocks`, payload, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      commit('setCart', []);
    },
  },
};
