import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataProducts: [],
    url: 'https://still-tundra-68355.herokuapp.com',
    notLogin: true,
    logedIn: false,
    dataCart: null
  },
  mutations: {
    getProductState(state, payload){
      state.dataProducts = payload
    },

    loginStateUpdate(state){
      state.notLogin = false
      state.logedIn = true
    },

    logoutStateUpdate(state){
      state.notLogin = true
      state.logedIn = false
    },

    showDataCart(state, payload){
      state.dataCart = payload
    }

  },
  actions: {
    loginState(context){
      context.commit('loginStateUpdate')
    },

    logoutState(context){
      localStorage.removeItem('token')
      context.commit('logoutStateUpdate')
    },

    getProduct(context){
      axios({
        method: 'get',
        url: `${this.state.url}/products`
      })
        .then(res=>{
          context.commit('getProductState', res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },

    getDataCart(context){
      axios({
        method: 'get',
        url: `${this.state.url}/products/cart`,
        headers: {token: localStorage.getItem('token')}
      })
        .then(res=>{
          context.commit('showDataCart', res.data.Products)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  modules: {

  }
})
