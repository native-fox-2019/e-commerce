<template>
<div>
  <div class="carousel slide" data-ride="carousel" style="margin-top: 60px">
    <div class="carousel-inner">
      <div class="carousel-item active">
          <img src="https://i.shgcdn.com/d6ad9d6e-c95b-4b7d-8ffc-01ae14f4ba92/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          class="d-block w-100"
          alt="Baju">
      </div>
    </div>
  </div>
  <div style="margin-top: 40px" id="featuredProduct">
    <h1>Featured Product</h1>
  </div>
  <div id="card">
    <div class="card mx-3 mb-2 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;" v-for="product in products" :key="product.id">
      <img class="card-img-top img-fluid rounded" :src="product.image_url" :alt="product.name">
      <div class="card-body">
        <h4 class="card-title">{{ product.name }}</h4>
        <h5 class="card-text">Rp. {{ product.price.toLocaleString() }}</h5>
        <h5 class="card-text">Stock: {{ product.stock }}</h5>
        <a href="" @click.prevent="addToCartForm(product.id)" class="btn btn-primary mx-1">Add to Cart</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    this.getProducts();
  },
  computed: mapState(['products', 'loading']),
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    addToCartForm(id) {
      this.$store.dispatch('addToCartForm', id);
    }
  }
}
</script>

<style>
#card {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
  margin-top: 40px;
}

</style>