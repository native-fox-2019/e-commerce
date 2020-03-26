import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token'),
    isAdmin: localStorage.getItem('level'),
    items: [],
    axiosUrl: 'http://localhost:3000',
    showModal: false,
    findResult: [],
    refresh: false,
    carts: [],
  },
  mutations: {
    toggleLoginAdmin(state) {
      state.isLogin = localStorage.getItem('token');
      state.isAdmin = 'admin';
      console.log('jalan dong', state.isLogin, state.isAdmin);
    },
    toggleLoginUser(state) {
      state.isLogin = localStorage.getItem('token');
      state.isAdmin = 'user';
    },
    pushNewState(state, payload) {
      console.log(state.items);
      console.log(payload);
      state.items = [];
      state.items = payload;
    },

    pushCarts(state, payload) {
      state.carts = [];
      state.carts = payload;
      console.log(state.carts);
    },

    toggleModal(state) {
      state.showModal = !state.showModal;
      console.log(state.showModal);
    },
    emptyFind(state) {
      state.findResult = [];
    },
    setFind(state, payload) {
      state.findResult = payload;
      console.log(state.findResult);
    },
    comitNewData(state, payload) {
      state.items.push(payload);
    },
    deleteById(state, id) {
      const array = state.items.filter((element) => element.id !== id);
      state.items = array;
      console.log(array);
    },
    logout(state) {
      state.isLogin = false;
      state.isAdmin = false;
    },

  },
  actions: {
    adminLogin(context) {
      context.commit('toggleLoginAdmin');
    },
    getAllItem(context) {
      axios({
        method: 'GET',
        url: `${context.state.axiosUrl}/product`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          console.log(data);
          context.commit('pushNewState', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pushData(context, payload) {
      context.commit('comitNewData', payload);
    },
    deleteData(context, id) {
      context.commit('deleteById', id);
    },
    register(context, payload) {
      axios({
        url: `${context.state.axiosUrl}/user/register`,
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          level: payload.level,
        },
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('name', data.data.name);
          localStorage.setItem('level', data.data.level);
          // console.log(data.data);
          if (payload.level === 'admin') {
            context.commit('toggleLoginAdmin');
            router.push('/adminpage');
          } else {
            context.commit('toggleLoginUser');
            router.push('/');
          }
        })
        .catch((err) => {
          // console.log(err.response, 'ini errroooor');
          if (Array.isArray(err.response.data.msg)) {
            console.log('masuk sini');
            const arrError = [];
            for (let i = 0; i < err.response.data.msg.length; i += 1) {
              arrError.push(err.response.data.msg[i]);
            }
            console.log(arrError, 'ini array');
            Swal.fire({
              icon: 'error',
              title: 'cannot register',
              html: `<span>${arrError.join('<br>')}</span>`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'cannot register',
              html: `<span>${err.response.data.msg}</span>`,
            });
          }
        });
    },

    getCarts(context) {
      axios({
        method: 'GET',
        url: `${context.state.axiosUrl}/cart`,
        headers: { token: localStorage.getItem('token') },
      }).then((data) => {
        // console.log(data.data);
        context.commit('pushCarts', data.data);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  modules: {
  },
});
