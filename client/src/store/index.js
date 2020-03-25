import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productsAdmin: [],
    productEdit: {},
    customerCart: [],
    userArr:[]
  },
  mutations: {
    fillProduct(state, payload) {
      state.products = payload
      console.log(state.products)
    },
    fillProductAdmin(state, payload) {
      state.productsAdmin = payload
      console.log(state.productsAdmin)
    },
    fillCart(state, payload) {
      state.customerCart = payload
      console.log(state.customerCart)
    },
    commitNewData(state, payload) {
      state.products.push(payload);
      state.productsAdmin.push(payload);
    },
    commitEditData(state, payload) {
      console.log("ini payload mutation", payload)
      state.productEdit["data"] = payload
      console.log("ini state.productedit", state.productEdit.data)
    },
    deleteDataArray(state, id) {
      state.products = state.products.filter(item => item.id !== id)
      state.productsAdmin = state.productsAdmin.filter(item => item.id !== id)

    },
    updateEditData(state, payload) {
      state.products.forEach(product => {
        if (product.id == state.productEdit.data.id) {
          product = payload
        }
      });
    },
    addItemCart(state, payload) {
      state.customerCart.push(payload)
    },
    filterCart(state, id) {
      state.customerCart = state.customerCart.filter(item => item.id !== id)
    },
    fillUser(state,payload){
      state.userArr=payload
    },
    filterUser(state,id){
      state.userArr=state.userArr.filter(user => user.id != id)
    },
    updateRole(state,payload){
      state.userArr.forEach(user =>{
        if(user.id == payload.id){
          user == payload
        }
      })
    }
  },


  actions: {

    getAllProducts(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/product/customer"
      }).then(response => {
        context.commit("fillProduct", response.data)
      })
    },
    getAllProductsCart(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/cart",
        headers: { token: localStorage.getItem("tokenAdmin") || localStorage.getItem("tokenCustomer") }
      }).then(response => {
        context.commit("fillCart", response.data)
      })
    },
    getAllProductsAdmin(context) {
      axios({
        method: "GET",
        url: "http://localhost:3000/product",
        headers: { token: localStorage.getItem("tokenAdmin") }
      }).then(response => {
        context.commit("fillProductAdmin", response.data)
      })
    },

    pushData(context, payload) {
      context.commit('commitNewData', payload);
    },

    holdEditData(context, payload) {
      console.log("ini payload action", payload)
      context.commit('commitEditData', payload)
    },
    deleteData(context, id) {
      context.commit('deleteDataArray', id)
    },
    updateData(context, payload) {
      context.commit('updateEditData', payload)
    },
    holdCartItem(context, payload) {
      context.commit('addItemCart', payload)
    },
    deleteDataCart(context, id) {
      context.commit('filterCart', id)
    },
    getAllUsers(context) {
      axios({
        url: "http://localhost:3000/user",
        method: "GET",
        headers: { token: localStorage.getItem("tokenAdmin") }
      }).then(response => {
        context.commit("fillUser", response.data)
      })
    },
    deleteDataUser(context,id){
      context.commit('filterUser',id)
    },
    updateUserRole(context,payload){
      context.commit('updateRole',payload)
    }

  },
  modules: {}
});
