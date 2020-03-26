<template>
  <div class="MainPage py-3">
    <div class="container d-flex flex-column justify-content-start">

      <Navbar/>

      <nav id="banner" class="banner-container shadow mb-3"></nav>

      <nav class="card-container shadow p-2">
        <div class="row">
          <div class="col-12">
            <div class="h2 text-center my-5">Products</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex flex-row flex-wrap justify-content-center">
            <ProductCard v-for="product in productsDesc" :key="product.id" :product="product"/>
          </div>
        </div>
      </nav>

      <ProductModal/>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    Navbar,
    ProductCard,
    ProductModal
  },
  created() {
    this.$store.dispatch('products')
  },
  computed: mapGetters(['productsDesc']),
  methods: {
  }
}
</script>