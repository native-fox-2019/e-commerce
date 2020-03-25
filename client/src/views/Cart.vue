<template>
  <div class="cart">
      <div v-for="product in cart" :key="product.id" class="card">
        <div class="title">
          <h2>{{product.name}}</h2>
        </div>
        <div class="desc">
          <h4>{{product.price}}</h4>
          <h4>{{product.stock}}</h4>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Cart',
    computed: {
        cart () {
            return this.$store.state.cart
        }
    }
}
</script>

<style>

</style>