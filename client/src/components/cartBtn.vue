<template>
  <v-btn icon>
    <div @click.prevent="toCart">
    <v-icon>
      mdi-cart
    </v-icon>
      <p>Cart</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "cartBtn",
  methods: {
    toCart() {
      this.$router.push({name: "Transaction"})
      this.$emit('toHome')
    }
  }
}
</script>

<style>

</style>