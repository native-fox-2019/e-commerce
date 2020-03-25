<template>
<div>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="$store.state.showModal"
    @click="$store.commit('toggleModal')"></div>
  </transition>
  <transition name="slide" appear>
    <div class="modal" v-if="$store.state.showModal">
      <h1>{{id.productDatum.name}} </h1>
      <!--  -->
      <form  v-on:submit.prevent="addCart(cart.amount)">
        <div class="modal-split">
          <div class="containerForm">
              <img :src="id.productDatum.image_url" style="width:190px; height:290px">
          </div>
          <div class="left-holder">
            <span class="textForm"> Stock(s) : {{id.productDatum.stock}} </span>
            <input v-model="cart.amount" class="input-number" type="number" placeholder="amount">
          <div class="modal-button">
              <input class="btn-modal" type="submit" value="Add Comic">
          </div>
          </div>
        </div>
  </form>
  <button class="btn-modal cancel" @click="$store.commit('toggleModal')">Cancel</button>
      <!--  -->
    </div>
  </transition>
</div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: ['id'],

  data() {
    return {
      cart: {
        amount: '',
      },
    };
  },

  methods: {
    addCart(amt) {
      console.log(amt);
      console.log(this.id.productDatum.id);
      axios({
        method: 'post',
        url: `${this.$store.state.axiosUrl}/cart/${this.id.productDatum.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          amount: amt,
        },
      })
        .then((data) => {
          console.log(data.data);
          Swal.fire({
            text: `${this.id.productDatum.name} Added to your cart`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Continue Shopping',
            cancelButtonText: 'Go to Cart',
          }).then((result) => {
            if (result.value) {
              console.log('continue shopping');
              this.$router.push('/');
              this.$store.commit('toggleModal');
            } else {
              console.log('ini ke cart');
              this.$router.push('/cart');
              this.$store.commit('toggleModal');
            }
          });
        })
        .catch((err) => {
          console.log(err.response);
          const array = [];
          err.response.data.msg.forEach((ele) => {
            array.push(ele);
          });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: array,
          });
        });
    },
  },
};
</script>
