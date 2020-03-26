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
    userArr:[],
    checkOutItem:[]
  },
  mutations: {
    fillProduct(state, payload) {
      state.products = payload
    },
    fillProductAdmin(state, payload) {
      state.productsAdmin = payload
    },
    fillCart(state, payload) {
      state.customerCart = payload
    },
    commitNewData(state, payload) {
      state.products.push(payload);
      state.productsAdmin.push(payload);
    },
    commitEditData(state, payload) {
      state.productEdit["data"] = payload
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
          user.role = payload.role
        }
      })
    },
    updateAmount(state,payload){
      state.customerCart.forEach(item =>{
        if(item.id == payload.id){
          item.amount = payload.amount
        }
      })
    },
    checkOut(state,payload){
      state.checkOutItem.push(payload[0])   
    },
    addItem(state,payload){
      state.checkOutItem.push(payload)
    },
    deleteItem(state,payload){
      state.checkOutItem = state.checkOutItem.filter(item => item.id != payload.id)
    },
    emptyCheckout(state){
      state.checkOutItem = []
    }
  },


  actions: {

    getAllProducts(context) {
      axios({
        method: "GET",
        url: "https://murmuring-caverns-76029.herokuapp.com/product/customer"
      }).then(response => {
        context.commit("fillProduct", response.data)
      })
    },
    getAllProductsCart(context) {
      axios({
        method: "GET",
        url: "https://murmuring-caverns-76029.herokuapp.com/cart",
        headers: { token: localStorage.getItem("tokenAdmin") || localStorage.getItem("tokenCustomer") }
      }).then(response => {
        context.commit("fillCart", response.data)
      })
    },
    getAllProductsAdmin(context) {
      axios({
        method: "GET",
        url: "https://murmuring-caverns-76029.herokuapp.com/product",
        headers: { token: localStorage.getItem("tokenAdmin") }
      }).then(response => {
        context.commit("fillProductAdmin", response.data)
      })
    },

    pushData(context, payload) {
      context.commit('commitNewData', payload);
    },

    holdEditData(context, payload) {
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
        url: "https://murmuring-caverns-76029.herokuapp.com/user",
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
    },
    updateAmountCart(context,payload){
      context.commit('updateAmount',payload)
    },
    itemCheckout(context,payload){
      context.commit('checkOut',payload)
    },
    plusItem(context,payload){
      context.commit("addItem",payload)
    },
    minusItem(context,payload){
      context.commit("deleteItem",payload)
    }

  },
  modules: {}
});
