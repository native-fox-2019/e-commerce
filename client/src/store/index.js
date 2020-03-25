import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const server=axios.create({
  baseURL: 'http://localhost:3000/',
})

export default new Vuex.Store({
  state: {
    _isLoading:false,
    _isLogin:false
  },
  mutations: {
    setIsLoading(state,payload){
      state._isLoading=payload
    },
    setIsLogin(state,payload){
      state._isLogin=payload
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
