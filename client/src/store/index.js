import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// const url = 'https://cryptic-inlet-94242.herokuapp.com/'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [{
      id: 1,
      name: 'risol',
      price: 2000,
      stocks: 5,
      imageURL: 'https://craftlog.com/m/i/5214819=s1280=h960'
    },
    {
      id: 2,
      name: 'lemper',
      price: 2000,
      stocks: 5,
      imageURL: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/sasefoto/original/22659-arem-arem-ayam.jpg'
    },
    {
      id: 3,
      name: 'tahu isi',
      price: 2000,
      stocks: 5,
      imageURL: 'https://i.ytimg.com/vi/juJCrwm-NJ8/maxresdefault.jpg'
    },
    {
      id: 4,
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N'
    }]
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
          console.log(result)
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
          console.log('=======', result.data.data)
          if (result.data.data) {
            result.data.data.forEach(el => {
              el.Product.price = `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(el.Product.price)}`
            })
            console.log(123)
            commit('LIST_PRODUCT', result.data.data)
          } else {
            console.log(456)
            commit('LIST_PRODUCT', null)
          }
        })
    }
  },
  modules: {
  }
})
