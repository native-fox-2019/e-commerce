import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [{
      name: 'lemper',
      price: 3000,
      stocks: 5
    },
    {
      name: 'risol',
      price: 3000,
      stocks: 5
    },
    {
      name: 'risol',
      price: 3000,
      stocks: 5
    }],
    cart: []
  },
  mutations: {
    GET_PRODUCTS (state, payload) {
      state.products = payload
    },
    GET_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getProducts ({ commit }) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'get'
      })
        .then(({ data }) => {
          data.forEach(el => {
            el.price = new Intl.NumberFormat(['ban', 'id']).format(el.price)
          })
          commit('GET_PRODUCTS', data)
        })
    },
    getCarts ({ commit }) {
      axios({
        url: 'http://localhost:3000/cart',
        method: 'get'
      })
        .then(({ data }) => {
          data.forEach(el => {
            el.price = new Intl.NumberFormat(['ban', 'id']).format(el.price)
          })
          commit('GET_CART', data)
        })
    }
  },
  modules: {
  }
})
