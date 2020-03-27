import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productDetail: {},
    shoppingCart: [],
    cartDetail: {},
    totalPrice: 0
  },
  mutations: {
    products(state, data) {
      state.products = data
    },
    shoppingCart(state, { cart, total }) {
      state.shoppingCart = cart
      state.totalPrice = total
    },
    logout(state) {
      state.products = []
      state.shoppingCart = []
    },
    productFind(state, data) {
      state.productDetail = data
    },
    findCart(state, data) {
      state.cartDetail = data
    },
    // modalReset(state) {
    //   state.productDetail = {}
    //   state.cartDetail = {}
    // }
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
        context.dispatch('showError', err)
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
          let total = 0
          cart.forEach(i => {
              total += i.price * i.ShoppingCart.quantity
          });
          context.commit('shoppingCart', { cart, total })
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
      context.dispatch('swalMixin', 'Logout Success!')
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
        dispatch('showError',err)
      })
    },
    findCart(context, id) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/shop/cart/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        context.commit('findCart', data)
      })
      .catch(err => {
        context.dispatch('showError', err)
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
        url: 'http://localhost:3000/shop/cart/' + editItem.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: { quantity: editItem.quantity }
      })
      .then(({ data }) => {
        dispatch('shoppingCart')
        dispatch('swalMixin', data.message)
      })
      .catch(err => {
        dispatch('showError', err)
      })
    },
    deleteCart({ dispatch }, id) {
      Axios({
        method: 'DELETE',
        url: 'http://localhost:3000/shop/cart/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        dispatch('shoppingCart')
        dispatch('swalMixin', 'Cart item deleted!')
      })
      .catch(err => {
        dispatch('showError', err)
      })
    },
    checkout({ dispatch }) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/shop/checkout',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        dispatch('shoppingCart')
        dispatch('products')
        dispatch('swalMixin', 'Thank You for your custom :)')
      })
      .catch(err => {
        dispatch('showError', err)
      })
    },
    showError(context, err) {
      let message = ''
      if (err.response) {
        if (Array.isArray(err.response.data.message)) {
          message = err.response.data.message.join('<br>')
        } else {
          message = err.response.data.message
        }
      } else if (err.message) {
        message = err.message
      } else if (err.request) {
        message = err.request
      } else {
        message = 'Oops, something wen\'t wrong!'
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
    checkoutList: state => state.shoppingCart,
    total: state => state.totalPrice.toLocaleString()
  },
  modules: {
  }
})
