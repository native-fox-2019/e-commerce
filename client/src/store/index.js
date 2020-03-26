import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : [],
    productEdit : {},
    customerCart: [],
    userArr:[]
  },
  mutations: {
    fillProducts(state , payload){
      state.products = payload
    },
    updateAmount(state,payload){
      state.customerCart.forEach(item =>{
        if(item.id == payload.id){
          item = payload
        }
      })
    },
    addItemCart(state, payload) {
      state.customerCart.push(payload)
    },
    filterUser(state,payload){
      state.userArr=state.userArr.filter(user => user.id != payload)
    },
    fillCart(state, payload) {
      state.customerCart = payload
    },
    commitNewdata (state, payload) {
      state.products.push(payload)
    },
    commitDeleteData (state, payload) {
      state.products = state.products.filter(item => item.id !== payload)
    },
    commitEditData (state, payload) {
      state.productEdit['data'] = payload
    },
    commitUpdateData (state, payload) {
      state.products.forEach(element => {
        if(element.id == state.productEdit.data.id){
          element = payload
        }
      })
    }
  },
  actions: {
    getAllProducts(context){
      axios({
        method:"GET",
        url: "http://localhost:3000/products",
        headers: {token : localStorage.getItem("token")}
      })
      .then(response =>{
        context.commit("fillProducts",response.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    getAllProductsCart(context){
      axios({
        method: "get",
        url:"http://localhost:3000/carts",
        headers: {token : localStorage.getItem("token")}
      })
      .then(response => {
        context.commit("fillCart", response.data)
      })
    },
    addNewData(context, payload) {
      context.commit("commitNewData", payload)
    },
    deleteData(context, payload) {
      context.commit('commitDeleteData', payload)
    },
    holdEditData(context, payload) {
      context.commit('commitEditData', payload)
    },
    updateData(context, payload) {
      context.commit('commitUpdateData', payload)
    },
    updateAmountCart(context,payload){
      context.commit('updateAmount',payload)
    },
    holdCartItem(context, payload) {
      context.commit('addItemCart', payload)
    },
    deleteDataUser(context,payload){
      context.commit('filterUser',payload)
    }
  },
  modules: {}
});
