<template>
  <div class="home">
    <div class="d-flex felx-row flex-wrap justify-content-center align-center ">
      <b-card
        v-for="product in products" :key="product.id"
        :title="product.name"
        :img-src="product.imageURL"
        img-top
        style="max-width: 20rem; margin: 1vh"
        class="mb-2 shadow p-3 mb-5 bg-white rounded">
        <b-card-text>
          <h6>{{product.price}}</h6>
          <h4>{{product.stock}}</h4>
        </b-card-text>
        <b-button variant="primary">add to cart</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Products',
  components: {
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
