import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Axios from 'axios'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productDetail: {},
    shoppingCart: [],
    // totalPrice: 0
  },
  mutations: {
    products(state, data) {
      state.products = data
    },
    shoppingCart(state, cart) {
      state.shoppingCart = cart
    },
    logout(state) {
      state.products = []
      state.shoppingCart = []
    },
    productFind(state, found) {
      state.productDetail = found
    },
    productFormReset(state) {
      state.productDetail = {}
    },
  },
  actions: {
    products(context) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/shop'
      })
      .then(({ data }) => {
        context.commit('products', data)
      })
      .catch(err => {
        context.dispatch('showError',err)
      })
    },
    shoppingCart(context) {
      if (localStorage.access_token) {
        Axios({
          method: 'GET',
          url: 'http://localhost:3000/shop/cart',
          headers: { access_token: localStorage.access_token }
        })
        .then(({ data }) => {
          let cart = data.Products
          // let totalPrice = 0;
          // cart.forEach(x => {
          //   totalPrice += (x.shoppingCart.quantity * x.price );
          // })
          context.commit('shoppingCart', cart)
        })
        .catch(err => {
          context.dispatch('showError', err)
        })
      }
    },
    login({ dispatch }, data) {
      localStorage.access_token = data.access_token
      router.push({ path: '/' })
      dispatch('swalMixin', 'Login Success!')
    },
    logout(context) {
      delete localStorage.access_token
      router.push({ path: '/auth' })
      context.commit('logout')
    },
    gotoCart({ dispatch }) {
      if (localStorage.access_token) {
        router.push({ path: '/cart' })
      } else {
        dispatch('showError', { message: 'You must login first!' })
      }
    },
    addToCart({ dispatch }, newItem) {
        Axios({
        method: 'POST',
        url: 'http://localhost:3000/shop/cart',
        headers: {
          access_token: localStorage.access_token
        },
        data: newItem
      })
      .then(() => {
        dispatch('shoppingCart')
        dispatch('swalMixin', 'Added to Cart!')
      })
      .catch(err => {
        if (err.response.status === 401) router.push({ path: '/auth' })
        context.dispatch('showError',err)
      })
    },
    productFind(context, id) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/shop/' + id,
      })
      .then(({ data }) => {
        context.commit('productFind', data)
      })
      .catch(err => {
        context.dispatch('showError', err)
      })
    },
    editCart({ dispatch }, editItem) {
      Axios({
        method: 'PUT',
        url: 'http://localhost:3000/shop/cart' + editItem.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: editItem
      })
      .then(({ data }) => {
        dispatch('products')
        dispatch('swalMixin', data.message)
      })
      .catch(err => {
        dispatch('showError', err)
      })
    },
    productFormReset(context) {
      context.commit('productFormReset')
    },
    showError(context, err) {
      let message = '';
      if (err.response) {
        if (Array.isArray(err.response.data.message)) {
          message = err.response.data.message.join('<br>');
        } else {
          message = err.response.data.message;
        }
      } else if (err.request) {
        message = err.request;
      } else {
        message = err.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        html: `${message}`,
      })
    },
    swalMixin(context, message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: `${message}`
      })
    }
  },
  getters: {
    productsDesc: state => state.products.sort((a,b) => b.id -a.id),
    checkoutList: state => state.shoppingCart
  },
  modules: {
  }
})
