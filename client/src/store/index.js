import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// const HEROKU_URL = 'https://peaceful-thicket-02203.herokuapp.com'
const DEV_URL = "http://localhost:3000";
import converter from "../helpers/currency.js";
import Swal from 'sweetalert2'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: [],
    cartList: [],
    isLogin: ''
  },
  mutations: {
    getProduct(state, payload) {
      state.productList = payload;
    },
    addToCart(state, payload) {
      state.productList.forEach(i => {
        if (i.id === payload.product_id) {
          payload["name"] = i.name;
          payload["showPrice"] = converter(payload.total);
        }
      });
      state.cartList.push(payload);
    }
  },
  actions: {
    getProduct(context) {
      axios({
        method: "GET",
        url: `${DEV_URL}/products`
      })
        .then(data => {
          console.log(data.data);
          let payload = data.data;
          payload.forEach(i => {
            i["showPrice"] = converter(i.price);
          });
          context.commit("getProduct", payload);
        })
        .catch(response => {
          console.log(response);
        });
    },
    addToCart(context, payload) {
      axios({
        method: "POST",
        url: `${DEV_URL}/carts`,
        headers: { access_token: localStorage.access_token },
        data: payload
      })
        .then(data => {
          console.log(data)
          if (isNaN(payload.amount) || payload.amount == 0) {
            throw Error ('cannot be 0')
          }
          Swal.fire({
            title:'Added to cart',
            timer:1000
          })
          context.commit("addToCart", payload);
        })
        .catch((response) => {
          console.log(response);
          Swal.fire({
            icon:'warning',
            title: response == 'Error: cannot be 0' ? 'Amount cant be 0' : 'You have to login first'
          })
        });
    },
    deleteAllCart() {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/carts/all",
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          console.log(data);
          Swal.fire({
            icon:'success',
            title:'Thank you for ordering',
            text:`We will proceed with the order`,
            timer:5000
          })
        })
        .catch(response => {
          console.log(response.response);
        });
    }
  },
  modules: {}
});
