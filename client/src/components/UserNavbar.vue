<template>
  <div style="height: 60px; position: fixed; width: 100%; top: 0; z-index: 1000;" class="bg-dark">
    <a href="">
      <img src="../assets/cart-36-32.png" alt="Shopping Cart" style="position: fixed; z-index:2000;left: 20px; top: 10px; position: fixed">
    </a>
    <div class="mt-2" v-if="this.$route.path === '/'">
      <a href="#featuredProduct" style="text-decoration: none;">
        <img src="//cdn.shopify.com/s/files/1/0218/8417/4408/files/Top-Nav-FEATURED_x40.png?v=1581442204" alt="" role="presentation">
        <span class="Heading">Featured</span>
      </a>
    </div>
    <button class="btn btn-danger"
    style="right: 20px; top: 10px; position: fixed;"
    @click.prevent="logoutUser">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser');
    },
  }
}
</script>

<style>

.Heading {
    font-family: Montserrat,sans-serif;
    vertical-align: middle;
    font-weight: 500;
    font-style: normal;
    color: #1c1b1b;
    transition: color 0.2s ease-in-out;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    font-size: 19px;  
}
</style>