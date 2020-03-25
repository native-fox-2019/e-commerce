<template>
  <div class="page">
    <div class="home">
      <h1 v-if="products.length !== 0">Our Products</h1>
      <p v-if="products.length === 0"
        style="font-weight: 500; font-size: 25px">LOADING....</p>
      <div class="products">
        <ProductCard v-for="product in products" :key="product.id"
        :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'Home',
  components: {
    ProductCard,
  },
  created() {
    this.$store.commit('setPage', 'home');
    this.getProducts();
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const options = {
        url: `${this.$store.state.baseUrl}/products`,
        method: 'get',
      };
      axios(options)
        .then(({ data }) => {
          this.products = data.products;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
};
</script>
