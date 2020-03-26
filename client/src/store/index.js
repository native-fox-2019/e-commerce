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
    productDetail: {}
  },
  mutations: {
    products(state, data) {
      state.products = data
    },
    logout(state) {
      state.products = []
    },
    productAdd(state, newProduct) {
      state.products.push(newProduct)
    },
    productFind(state, found) {
      state.productDetail = found
    },
    productDelete(state, id) {
      state.products = state.products.filter(product => product.id !== id)
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
        this.dispatch('showError',err)
      })
    },
    logout(context) {
      delete localStorage.access_token
      router.push({ path: '/' })
      context.commit('logout')
    },
    productAdd(context, newProduct) {
        Axios({
        method: 'POST',
        url: 'http://localhost:3000/shop',
        headers: {
          access_token: localStorage.access_token
        },
        data: newProduct
      })
      .then(({ data }) => {
        context.commit('productAdd', data)
        Toast.fire({
          icon: 'success',
          title: 'Add Success!'
        })
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
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
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productEdit({ dispatch }, { updateProduct, productId }) {
      Axios({
        method: 'PUT',
        url: 'http://localhost:3000/shop/' + productId,
        headers: {
          access_token: localStorage.access_token
        },
        data: updateProduct
      })
      .then(() => {
        dispatch('products')
        Toast.fire({
          icon: 'success',
          title: 'Edit Success!'
        })
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productDelete(context, id) {
      Axios({
        method: 'DELETE',
        url: 'http://localhost:3000/shop/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        context.commit('productDelete', id)
        Toast.fire({
          icon: 'success',
          title: 'Delete Success!'
        })
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
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
    productsDesc: state => state.products.sort((a,b) => b.id -a.id)
  },
  modules: {
  }
})
