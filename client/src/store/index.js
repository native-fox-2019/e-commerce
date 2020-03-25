import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: localStorage.getItem('access_token') ? true : false,
        rootUrl: 'http://localhost:3000',
        products: [],
        user_info: {},
        product_temp: {},
        cart: []
    },
    mutations: {
        setProduct: function (state, payload) {
            state.products = payload
        }
    },
    actions: {
        errorHandler: function (context, err_payload) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${
                    Array.isArray(err_payload.data.message)
                        ? err_payload.data.message.join(' And ')
                        : err_payload.data.message
                }`
            });
        },
        messageHandler: function (context, msg_payload) {
            Swal.fire({
                icon: 'success',
                title: 'Error',
                text: `${
                    Array.isArray(msg_payload.data.message)
                        ? msg_payload.data.message.join(' And ')
                        : msg_payload.data.message
                }`
            });
        },
        getAllProduct: function (context) {
            axios({
                    method: 'get',
                    url: `${this.state.rootUrl}/product/all`,
                })
                .then(result => {
                    context.commit('setProduct', result.data)
                })
                .catch(err => {
                    context.dispatch('errorHandler', err.response)
                })
        }
    }
});