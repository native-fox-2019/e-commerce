<template>
    <div class="page">
        <h2 style="text-align: center">{{$store.state.name}}'s Cart</h2>
        <div class="carts">
            <span v-if="isLoading">LOADING...</span>
            <div class="checkout-all">
              <button @click="showAddressForm()">Checkout All (Rp{{totalCheckoutPrice}})</button>
            </div>
            <div class="cart" v-for="cart in carts" :key="cart.id">
                <div class="cart-content">
                    <div class="cart-image">
                        <img :src="cart.Product.image_url" width="auto" height="130px">
                    </div>
                    <div class="cart-details">
                        <h3>{{cart.Product.name}}</h3>
                        <span>Amount: {{cart.amount}}</span><br>
                        <span>Total Price: Rp{{cart.total_price}}</span>
                    </div>
                </div>
                <div class="cart-action">
                  <div class="cart-checkout">
                    <button
                      @click.prevent="showAddressForm(cart.id, cart.amount, cart.total_price,
                      cart.UserId, cart.ProductId)">
                      Checkout
                    </button>
                  </div>
                  <div class="cart-delete" @click="deleteCart(cart.id)">
                    <i class="fa fa-trash" style="font-size: 25px; color: red"></i>
                  </div>
                </div>
            </div>
        </div>
        <div class="modal-cust" v-if="addressForm">
          <div class="address">
            <div>
              <div class="close" @click="addressForm = false; address=''; item={};">+</div>
              <h2 style="margin-bottom: 20px;">Add Address</h2>
              <form @submit.prevent="checkout">
                <textarea v-model="address" rows="10" cols="40"></textarea><br>
                <button type="submit" style="margin-top: 10px;">Checkout</button>
              </form>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'Cart',
  data() {
    return {
      carts: [],
      isLoading: true,
      totalCheckoutPrice: 0,
      addressForm: false,
      address: '',
      item: {},
    };
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$router.push('/');
    }
    this.$store.commit('setPage', 'cart');
    this.getCarts();
  },
  watch: {
    carts() {
      this.totalCheckoutPrice = 0;
      this.carts.forEach((item) => {
        this.totalCheckoutPrice += item.total_price;
      });
    },
  },
  methods: {
    getCarts() {
      const options = {
        url: `${this.$store.state.baseUrl}/cart`,
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      };
      axios(options)
        .then(({ data }) => {
          this.carts = data.carts;
          this.isLoading = false;
        })
        .catch(({ response }) => {
          console.log(response);
          swal({
            icon: 'error',
            text: 'oops! Something went wrong',
          });
        });
    },
    showAddressForm(id, amount, totalPrice, UserId, ProductId) {
      this.addressForm = true;
      if (id && amount && totalPrice && UserId && ProductId) {
        this.item = {
          id, amount, total_price: totalPrice, UserId, ProductId,
        };
      }
    },
    checkout() {
      swal({
        title: 'Are you sure to make transactions?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((result) => {
          if (result) {
            if (this.item.id) {
              const options = {
                url: `${this.$store.state.baseUrl}/transactions`,
                method: 'post',
                headers: {
                  token: localStorage.token,
                },
                data: {
                  ...this.item,
                  address: this.address,
                },
              };
              axios(options)
                .then(({ data }) => {
                  swal({
                    icon: 'success',
                    text: `${data.message}, wait for the confirmation via email`,
                  });
                  this.carts = this.carts.filter((cart) => cart.id !== this.item.id);
                  this.item = {};
                  this.address = '';
                  this.addressForm = false;
                })
                .catch(({ response }) => {
                  swal({
                    icon: 'error',
                    text: response.data.msg,
                  });
                  this.item = {};
                  this.address = '';
                  this.addressForm = false;
                });
            } else {
              const options = {
                url: `${this.$store.state.baseUrl}/transactions/all`,
                method: 'post',
                headers: {
                  token: localStorage.token,
                },
                data: {
                  address: this.address,
                },
              };
              axios(options)
                .then(({ data }) => {
                  swal({
                    icon: 'success',
                    text: `${data.message}, wait for the confirmation via email`,
                  });
                  this.carts = [];
                  this.item = {};
                  this.address = '';
                  this.addressForm = false;
                })
                .catch(({ response }) => {
                  swal({
                    icon: 'error',
                    text: response.data.msg,
                  });
                  this.item = {};
                  this.address = '';
                  this.addressForm = false;
                });
            }
          } else {
            this.item = {};
            this.addressForm = false;
            this.address = '';
          }
        });
    },
    deleteCart(id) {
      const options = {
        url: `${this.$store.state.baseUrl}/cart/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      };
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this cart',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios(options)
              .then(({ data }) => {
                swal({
                  text: data.message,
                  icon: 'success',
                });
                this.carts = this.carts.filter((item) => item.id !== id);
              })
              .catch(({ response }) => {
                console.log(response);
                swal(response.data.message);
              });
          } else {
            swal('Your cart is safe!');
          }
        });
    },
  },
};
</script>
