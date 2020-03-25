import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: null,
    userProduct: null,
    cartList: null,
    token: null,
    usertoken: null,
    eachProduct: null,
    eachCart: null,
    total: 0,
  },
  mutations: {
    viewProducts(state, params) {
      state.productList = params;
    },
    userProducts(state, params) {
      state.userProduct = params;
    },
    viewCart(state, params) {
      state.cartList = params;
    },
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          context.commit('viewProducts', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Products(context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/userproduct',
      })
        .then((data) => {
          context.commit('userProducts', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(context, params) {
      swal({
        title: 'Are you sure want to edit this?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willEdit) => {
          if (willEdit) {
            axios({
              method: 'PUT',
              url: `http://localhost:3000/product/${params.id}`,
              headers: { token: localStorage.getItem('token') },
              data: {
                name: params.name,
                image_url: params.image_url,
                price: params.price,
                stock: params.stock,
              },
            })
              .then((data) => {
                console.log(data);
                swal('file has been edited! click view product to see the product again', {
                  icon: 'success',
                });
                router.push({ name: 'Panel' });
              })
              .catch((error) => {
                swal({
                  icon: 'error',
                  title: 'data can be edited! make sure you have filled the data',
                });
                console.log(error);
              });
          } else {
            swal('file edit cancelled! click view product to see the product again');
            router.push({ name: 'Panel' });
          }
          console.log('deleted');
        });
    },
    deleteProduct(context, id) {
      swal({
        title: 'Are you sure want to delete this?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: `http://localhost:3000/product/${id}`,
              headers: { token: localStorage.getItem('token') },
            })
              .then((data) => {
                console.log(data);
                context.dispatch('getProducts');
              })
              .catch((error) => {
                console.log(error);
              });
            swal('file has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('deleting file cancelled!');
            router.push({ name: 'Panel' });
          }
          console.log('deleted');
        });
    },
    addToCart(context, id) {
      swal({
        title: 'Are you sure want to add product to cart?',
        buttons: true,
        dangerMode: true,
      })
        .then((willAdd) => {
          if (willAdd) {
            axios({
              method: 'POST',
              url: 'http://localhost:3000/addtocart',
              headers: { token: localStorage.getItem('token') },
              data: {
                ProductId: Number(id),
              },
            })
              .then((data) => {
                console.log(data);
                axios({
                  method: 'PUT',
                  url: `http://localhost:3000/editstock/${id}`,
                  headers: { token: localStorage.getItem('token') },
                  data: {
                    stock: Number(this.state.eachProduct.stock - 1),
                  },
                })
                  .then((result) => {
                    console.log(result);
                    this.state.eachProduct = null;
                    context.dispatch('Products');
                  });
              })
              .catch((err) => {
                console.log(err.err);
              });
            swal({
              icon: 'success',
              title: 'Product successfully added.',
            });
            this.$router.push({ name: 'Home' });
          } else {
            swal('Add To Cart cancelled');
            this.$router.push({ name: 'Home' });
          }
        });
    },
    getCart(context) {
      this.state.total = 0;
      axios({
        method: 'GET',
        url: 'http://localhost:3000/getcart',
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          data.data.forEach((element) => {
            this.state.total += element.Product.price;
          });
          context.commit('viewCart', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCart(context, id) {
      swal({
        title: 'Are you sure want to remove this?',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: `http://localhost:3000/deletecart/${id}`,
              headers: { token: localStorage.getItem('token') },
            })
              .then((data) => {
                console.log(data);
                axios({
                  method: 'PUT',
                  url: `http://localhost:3000/editstock/${this.state.eachCart.Product.id}`,
                  headers: { token: localStorage.getItem('token') },
                  data: {
                    stock: Number(this.state.eachCart.Product.stock + 1),
                  },
                })
                  .then((result) => {
                    console.log(result);
                    this.state.eachProduct = null;
                    context.dispatch('getCart');
                  });
              })
              .catch((error) => {
                console.log(error);
              });
            swal('product has removed from cart!', {
              icon: 'success',
            });
          } else {
            swal('removing product cancelled!');
          }
        });
    },
  },
  modules: {
  },
});
