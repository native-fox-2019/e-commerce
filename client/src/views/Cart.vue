<template>
    <div class="page">
        <h2 style="text-align: center">{{$store.state.name}}'s Cart</h2>
        <div class="carts">
            <span v-if="isLoading">LOADING...</span>
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
                <div class="cart-action" @click="deleteCart(cart.id)">
                    <i class="fa fa-trash" style="font-size: 25px; color: red"></i>
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
    };
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$router.push('/');
    }
    this.$store.commit('setPage', 'cart');
    this.getCarts();
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
