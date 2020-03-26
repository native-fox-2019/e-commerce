import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let url = 'http://localhost:3000'
// let url = 'https://powerful-meadow-02119.herokuapp.com'
export default new Vuex.Store({
  state: {
    products : [],
    cart : [],
    totalCart : 0
  },
  mutations: {
    setData : (state, data) => {
      state.products = data
    },
    setCart : (state, data) =>{
      state.cart = data
    },
    setTotalCart : (state, data) =>{
      state.totalCart = data
    }
  },
  actions: {
    getProduct(context){
      axios({
        method : 'get',
        url : `${url}/products`,
        headers : {
          access_token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        context.commit('setData', response.data.data)
      })
      .catch(err=>[
        console.log(err)
      ])
    },
    getCart(context){
      axios({
        method : 'get',
        url : `${url}/cart/`,
        headers : {
          access_token : localStorage.getItem('token')
        }
      })
      .then(response=>{
        let totalCart = 0
        context.commit('setCart', response.data.Products)
        response.data.Products.forEach(x=>{
          totalCart += x.Cart.total
        })
        context.commit('setTotalCart', totalCart)
      })
      .catch(err=>{
        console.log(err)
      })
    },
  },
  modules: {
  }
})
