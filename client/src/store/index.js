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

function FORM(data){
  let _form=new FormData()
  for(var i in data){
    let d=data[i]
    _form.append(i,d)
  }
  return _form
}

export default new Vuex.Store({
  state: {
    _isLoading:false,
    _isLogin:false,
    IMG_SERVER:'http://localhost:3001/img/',
    BANNER_SERVER:'http://localhost:3001/banner/',
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
    loadHomeProducts({commit},page){
      var _page=page?page:page;
      commit('setIsLoading',true)
      var url='product'
      if(_page){
        url+='?page='+_page
      }
      return server.get(url,{
        page:_page
      },{
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
    loadProductsBySearch({commit},search){
      commit('setIsLoading',true)
      return server.get('product?search='+search,{
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
    loadProductsByCategory({commit},category){
      commit('setIsLoading',true)
      return server.get('product?category='+category,{
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
    loadBanners(){
      return server.get('banner')
      .then((response)=>{
        return response.data
      })
      .catch((err)=>{
        console.log('Ada error saat loadBanner',err)
      })
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
        return token
      })
      .catch((err)=>{
        console.log('Ada error saat login',err)
        return null
      })
      .finally(()=>{
        commit('setIsLoading',false)
      })
      
    },
    signUp({commit},form){
      commit('setIsLoading',true)
      return server.post('register',form)
      .then((result)=>{
        return {err:0,result}
      })
      .catch(err=>{
        console.log('Ada error saat register',err)
        return {err:1,error:err}
      })
      .finally(()=>{
        commit('setIsLoading',false)
      })
     
    },
    logout({commit}){
      localStorage.removeItem('token')
      commit('setIsLogin',false)
    },
    updateProfile({commit},form){
      commit('setIsLoading',true)
      var sentForm=FORM(form)
      return server.put('profile',sentForm,{
        headers:HEADERS()
      })
      .then((result)=>{
        return {error:0,result}
      })
      .catch((err)=>{
        return {error:1,err}
      })
      .finally(()=>{
        commit('setIsLoading',false)
      })
    }
  },
  modules: {
  }
})
