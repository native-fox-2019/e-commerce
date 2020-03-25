import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const server=axios.create({
  baseURL: 'http://localhost:3000/',
})

function HEADERS(){
  return {
    token:localStorage.token
  }
}

export default new Vuex.Store({
  state: {
    _isLoading:false,
    _isLogin:false,
    IMG_SERVER:'http://localhost:3001/img/',
    cart:[]
  },
  mutations: {
    setIsLoading(state,payload){
      state._isLoading=payload
    },
    setIsLogin(state,payload){
      state._isLogin=payload
    },
    setCart(state,payload){
      state.cart=payload
    },
    emptyCart(state){
      state.cart=[]
    }
  },
  getters:{
    isLoading:(state)=>{
      return state._isLoading
    },
    islogin:(state)=>{
      return state._isLogin
    }
  },
  actions: {
    loadHomeProducts({commit}){
      commit('setIsLoading',true)
      return server.get('product',{
        headers:HEADERS()
      })
      .then((response)=>{
        return response.data
      })
      .catch((err)=>{
        console.log('Ada error saat loadHomeProducts',err)
      })
      .finally(()=>commit('setIsLoading',false))
    },
    addToCart({state},product){
      state.cart.push(product)
      var cart_str=JSON.stringify(state.cart)
      localStorage.setItem('cart',cart_str)
    },
    emptyCart({commit}){
      localStorage.removeItem('cart')
      commit('emptyCart')
    },
    getProductById({commit},id){
      commit('setIsLoading',true)
      return server.get('product/'+id,{
        headers:HEADERS()
      })
      .then((response)=>{
        return response.data
      })
      .catch((err)=>{
        console.log('Ada error saat loadHomeProducts',err)
      })
      .finally(()=>commit('setIsLoading',false))
    },
    login({commit},obj){
      commit('setIsLoading',true)
      return server.post('login',obj)
      .then((res)=>{
        var token=res.data.token
        localStorage.setItem('token',token)
        commit('setIsLogin',true)
      })
      .catch((err)=>{
        console.log('Ada error saat login',err)
      })
      .finally(()=>{
        commit('setIsLoading',false)
      })
      
    },
    signUp({commit},form){
      commit('setIsLoading',true)
      return server.post('register',form)
      .catch(err=>{
        console.log('Ada error saat register',err)
      })
      .finally(()=>{
        commit('setIsLoading',false)
      })
     
    },
    logout({commit}){
      localStorage.removeItem('token')
      commit('setIsLogin',false)
    }
  },
  modules: {
  }
})
