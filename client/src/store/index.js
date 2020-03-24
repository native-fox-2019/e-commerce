import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router/index';
const baseUrl = 'http://localhost:3000';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    products: []
  },
  mutations: {
    GET_PRODUCTS(state, data) {
      state.products = data;
    },
    ADD_PRODUCT(state, data) {
      state.products.unshift(data);
    },
    DELETE_DATA(state, data) {
      state.products = data;
    }
  },
  actions: {
    deleteDataConfirmation({ dispatch }, id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          dispatch('deleteData', id);
        }
      })
    },
    deleteData({ state, commit, dispatch }, id) {
      axios({
        method: 'DELETE',
        url: baseUrl + '/products/' + id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          let newData = state.products.filter(x => {
            return x.id !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          commit('DELETE_DATA', newData);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    addProduct({ commit, state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data
      })
        .then(({ data }) => {
          state.loading = false;
          router.push('/admin');
          commit('ADD_PRODUCT', data);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    getProducts({ commit, state, dispatch }) {
      state.loading = true;
      axios({
        method: 'GET',
        url: baseUrl + '/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          state.loading = false;
          let sorted = data.sort((a, b) => b.id - a.id);
          commit('GET_PRODUCTS', sorted);
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    logoutUser() {
      localStorage.removeItem('token');
      router.push('/login');
    },
    registerUser({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/users/register',
        data
      })
        .then(() => {
          state.loading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Registered successfully'
          })
          router.push('/login');
        }).catch(err => {
          dispatch('showError', err);
        });
    },
    loginUser({ state, dispatch }, data) {
      state.loading = true;
      axios({
        method: 'POST',
        url: baseUrl + '/users/login',
        data
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          state.loading = false;
          if (data.role === 'Admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        }).catch(err => {
          dispatch('showError', err);
        })
    },
    showError({ state }, err) {
      let msg = '';
      if (err.response) {
        if (Array.isArray(err.response.data.msg)) {
          msg = err.response.data.msg.join('<br>');
        } else {
          msg = err.response.data.msg;
        }
      } else if (err.request) {
        msg = err.response.data.msg;
        console.log(err.request);
      } else {
        msg = err.response.data.msg;
        console.log('err', err.message);
      }
      state.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `${msg}`,
      })
    }
  },
  modules: {
  }
})
