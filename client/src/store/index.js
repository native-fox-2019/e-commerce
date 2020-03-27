import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// const url = 'https://cryptic-inlet-94242.herokuapp.com/'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    LIST_PRODUCT (state, payload) {
      if (payload) {
        state.products = [...payload]
      } else {
        const emptyCart = [
          {
            Product: {
              name: 'you havent buy anything yet'
            }
          }
        ]
        state.products = emptyCart
      }
    }
  },
  actions: {
    getAll ({ commit }) {
      axios({
        url: `${url}/products`,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          result.data.forEach(el => {
            el.price = new Intl.NumberFormat(['ban', 'id']).format(el.price)
          })
          commit('LIST_PRODUCT', result.data)
        })
    },
    getCart ({ commit }) {
      axios({
        url: `${url}/user/cart`,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          if (result.data.data) {
            result.data.data.forEach(el => {
              el.Product.price = `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(el.Product.price)}`
            })
            commit('LIST_PRODUCT', result.data.data)
          } else {
            commit('LIST_PRODUCT', null)
          }
        })
    }
  },
  modules: {
  }
})
