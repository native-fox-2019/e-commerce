import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import { generatingJWT, veryfingJWT } from '../components/helper/jwt'
const server = `http://localhost:3000`
// const server = `https://shrouded-badlands-50874.herokuapp.com`
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAddProduct: false,
    isEditProduct: false,
    dataProducts: [],
    dataEditProducts: {},
    oneDataProduct: {},
    dataCarts: [],
    dataAllCarts: []
  },
  getters: {
    filterBaju(state) {
      return state.dataProducts.filter(baju => baju.Category.name == 'baju')
    }
  },
  mutations: {
    toIsLoginTrue(state) {
      state.isLogin = true
    },
    toIsLoginFalse(state) {
      state.isLogin = false
    },
    allItem(state, payload) {
      state.dataProducts = payload
    },
    setIsAddProductTrue(state) {
      state.isAddProduct = true
    },
    setIsAddProductFalse(state) {
      state.isAddProduct = false
    },
    setIsEditProductTrue(state) {
      state.isEditProduct = true
    },
    setIsEditProductFalse(state) {
      state.isEditProduct = false
    },
    dataEditfromActions(state, payload) {
      state.dataEditProducts = payload
    },
    ONE_PRODUCT(state, payload) {
      state.oneDataProduct = payload
    },
    CART_NOTIF(state, payload) {
      state.dataCarts = payload
    },
    ALL_CART(state, payload) {
      state.dataAllCarts = payload
    }

  },
  actions: {
    getAll(context, params = '') {
      axios({
        method: 'GET',
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          if (params) {
            const filterData = data.filter(item => item.Category.name == params)
            context.commit('allItem', filterData)
          } else {
            context.commit('allItem', data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct(context, objDataAdd) {
      axios({
        method: 'POST',
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        },
        data: objDataAdd,
      })
        .then(({ data }) => {
          context.dispatch('getAll')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    deleteProduct(context, id) {
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
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          axios({
            method: 'DELETE',
            url: `${server}/products/${id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(({ data }) => {
              context.dispatch('getAll')
            })
            .catch(err => {
              console.log(err)

            })
        }
      })
    },
    getOneProduct(context, id) {
      axios({
        method: 'GET',
        url: `${server}/products/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit("dataEditfromActions", data)
          context.commit("ONE_PRODUCT", data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        })
    },
    updateProduct(context, dataObj) {
      // console.log(dataObj, '<<<<<<< data dari edit')
      axios({
        method: 'PUT',
        url: `${server}/products/${dataObj.id}`,
        headers: {
          token: localStorage.token
        },
        data: dataObj
      })
        .then(({ data }) => {
          // console.log(data, "<<<<<< data")
          context.dispatch('getAll')
          context.commit('setIsEditProductFalse')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        })
    },
    addTocart(context, id) {
      // console.log(id, '<<<<<<< action')
      const token = localStorage.token
      const user = token ? veryfingJWT(token) : null
      // console.log(user, '<<<<< token')
      if (localStorage.token) {
        axios({
          method: 'POST',
          url: `${server}/cart`,
          data: {
            ProductId: id,
            UserId: user.id,
            qty: 1
          },
          headers: {
            token: localStorage.token
          }
        })
          .then(({ data }) => {
            context.commit('CART_NOTIF', data)
            // router.push({ name: "Cart" })
            // console.log(data, '<<<<<<<<CART ACTION')

          })
          .catch(err => {
            console.log(err.response)
          })
      } else {
        console.log("belum login atau register");


        Swal.fire({
          title: "Anda Belum Login?",
          text: "Silahkan Login",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#000",
          cancelButtonColor: "#2f3640",
          confirmButtonText: "Yup saya Login!"
        }).then(result => {
          if (result.value) {
            // Swal.fire("Deleted!", "Your file has been deleted.", "success");
            router.push({ name: "Login" });
          }
        });
      }
    },

    allCart({ commit }) {
      axios({
        method: 'GET',
        url: `${server}/cart`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('ALL_CART', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    actionDeleteCart(contex, id) {
      axios({
        method: "DELETE",
        url: `${server}/delete/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          contex.dispatch('allCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    }

  },
  modules: {
  }
})
