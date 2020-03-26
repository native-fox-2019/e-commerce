<template>
  <div class="MainPage py-3">
    <div class="container d-flex flex-column justify-content-start">

      <Navbar/>

      <nav class="banner-container shadow">
        <ProductList class="navbar navbar-light banner-container p-0 d-flex flex-column justify-content-start"/>
      </nav>

      <ProductModal/>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProductList from '../components/ProductList.vue'
import ProductModal from '../components/ProductModal.vue'

export default {
  name: 'CartPage',
  components: {
    Navbar,
    ProductList,
    ProductModal
  }
}
</script>