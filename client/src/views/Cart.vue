<template>
  <div>
    <div class="mb-3"><h3><u>My Cart</u></h3></div>
    <div class="d-flex-justify-content-space-between flex-warp">
     <b-button pill variant="success" @click.prevent="Logout" class="float-right mr-5">Logout</b-button>
            <b-button pill variant="primary" @click.prevent="checkout">checkout</b-button>
    <b-button pill variant="warning" @click.prevent="$router.push('/')" class="float-left ml-5">Back</b-button></div>
  <div></div>
    <div class="mt-5">
    <div class="row ml-auto mr-auto">
      <div class="col-3" v-for="product in $store.state.customerCart" :key="product.id" >
        <Cart :PropProduct="product"></Cart>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Cart from "../components/Cart";
export default {
  components: {
    Cart
  },
created(){
  this.$store.dispatch("getAllProductsCart")
},
  methods: {
    Add(){
      this.$router.push('add')
    },
    Logout(){
      localStorage.clear()
      this.$router.push('login')
    },
    checkout(){
        this.$router.push('checkout')

    }
  },
};
</script>

<style>
</style>