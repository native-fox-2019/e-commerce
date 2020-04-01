<template>
  <div class="mt-5">
    <Banner></Banner>
    <div class="px-5 py-2">
      <b-card>
        <div class="row">
          <Product v-for="product in products" :key="product.id" :product="product"></Product>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Product from '../components/Product'
export default {
  name: "Content",
  components: {
    Banner,
    Product
  },
  data(){
    return {
      // items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      // products: []
    }
  },
  methods: {

  },
  created(){
    this.$store.dispatch("getAllProduct")
  },
  computed: {
    products: function(){
      return this.$store.state.products
    }
  }

}
</script>

<style>

</style>