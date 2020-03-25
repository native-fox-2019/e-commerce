<template>
<div v-if="allCart">
<div class="container" style="margin-top: 70px">
  <b-list-group-item v-for="cart in allCart" :key="cart.id"
  class="col-12 d-flex justify-content-between align-items-center">
    <div class="col-6 d-flex justify-content-start">
      <div class="">
        <img :src="`${cart.Product.image_url}`" class="img"/>
      </div>
      <div class="text-left">
        <h4 class="">{{cart.Product.name}}</h4>
        <h5>{{formatPrice(cart.Product.price)}}</h5>
      </div>
    </div>
    <div class="col-2 d-flex justify-content-between align-items-center">
      <div class="p-1 m-1">
        <b-button variant="outline-danger" class="mb-2" size="sm"
          @click.prevent="deleteCart(cart)">
          <b-icon-trash class="h3 m-0 p-0"></b-icon-trash>
        </b-button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <b-button variant="outline-info" class="mb-2" size="sm"
          @click.prevent="decrementQty(cart)">
            <b-icon-dash class="h3 m-0 p-0"></b-icon-dash>
          </b-button>
        </div>
        <div>
          <b-card class="p-0 m-0">{{cart.quantity}}</b-card>
        </div>
        <div>
          <b-button variant="outline-info" class="mb-2" size="sm"
          @click.prevent="incrementQty(cart)">
            <b-icon-plus class="h3 m-0 p-0"></b-icon-plus>
          </b-button>
        </div>
      </div>
    </div>
    <b-card class="col-3">
      <div> {{formatPrice(cart.quantity * cart.Product.price)}} </div>
    </b-card>
  </b-list-group-item>
    <b-card >
      <div class="d-flex justify-content-center align-items-center flex-column">
        <div>
          <h4>Total Belanja</h4>
        </div>
        <div>
          <b-card class="h3">{{formatPrice(total)}}</b-card>
        </div>
        <div>
          <b-button variant="success" @click.prevent="checkout(allCart)">Checkout</b-button>
        </div>
      </div>
    </b-card>
</div>
</div>
</template>

<script>

export default {
  name: 'Carts',
  components: {
  },
  data() {
    return {
      total: null,
    };
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    incrementQty(cart) {
      const data = { quantity: cart.quantity + 1 };
      this.$axios
        .patch(`/carts/${cart.id}`, data, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.dispatch('getCart');
        })
        .catch(({response}) => {
          this.$swal.fire({
            icon: 'error',
            text: response.data.message,
          })
          console.log(response.data);
        });
    },
    decrementQty(cart) {
      const data = { quantity: cart.quantity - 1 };
      this.$axios
        .patch(`/carts/${cart.id}`, data, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$store.dispatch('getCart');
        })
        .catch(({response}) => {
          this.$swal.fire({
            icon: 'error',
            text: response.data.message[0],
          })
          console.log(response.data);
        });
    },
    deleteCart(cart) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this product from cart?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            this.$axios
              .delete(`/carts/${cart.id}`, {
                headers: {
                  token: localStorage.getItem('token'),
                },
              })
              .then(() => {
                this.$store.dispatch('getCart');
                this.$swal.fire(
                  'Deleted!',
                  'Product has been deleted from youre cart.',
                  'success',
                );
              })
              .catch((err) => {
                this.$swal.fire(
                  'Deleted!',
                  `${err}.`,
                  'error',
                );
              });
          }
        });
    },
    checkout(allCart) {
      this.$axios
        .post('/carts/checkout', allCart, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$Swal.fire(
            'Checkout Success',
            'Youre transaction Successfull.',
            'success',
          );
          this.showCart = false;
        })
        .catch((err) => {
          this.$Swal.fire(
            'Transaction Failed!',
            `${err}.`,
            'error',
          );
        });
    },
  },
  computed: {
    allCart() {
      return this.$store.state.carts;
    },
  },
  created() {
    this.$store.dispatch('getCart');
  },
  watch: {
    allCart() {
      let total = 0;
      this.allCart.forEach((el) => {
        total += el.quantity * el.Product.price;
      });
      this.total = total;
    },
  },
};
</script>

<style scoped>
.img{
  height: 20vh;
}
.card-body{
  padding: 0.25em !important
}
</style>