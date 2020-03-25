<template>
  <div class="product" v-if="product !== null">
    <div class="container">
      <h2 class="my-4">{{ product.name }}</h2>
      <hr />
      <div class="row">
        <div class="col-12 col-md-5">
          <figure>
            <img :src="product.image_url" class="img-fluid" />
          </figure>
        </div>
        <div class="col-12 col-md-4">
          <p>{{ product.name }}</p>
          <p>{{ product.category }}</p>
        </div>
        <div class="col-12 col-md-3">
          <h4>Rp {{ product.price.toLocaleString("id") }}</h4>
          <div v-if="isLoggedIn === true">
            <div v-if="isInCart === false">
              <button type="button" class="btn btn-danger" v-on:click="addToCart">Add to Cart</button>
              <p
                class="text-muted small mt-3"
              >To ensure that everyone can get their hands on COVID-19 survival products, we limit purchase quantity of this product to maximum of 1 product.</p>
            </div>
            <button
              type="button"
              class="btn btn-light"
              v-else
              v-on:click="removeFromCart"
            >Remove from Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  computed: {
    product() {
      if (!this.$store.state.products) return null;
      return (
        this.$store.state.products.find(
          p => p.id === parseInt(this.$route.params.id)
        ) || null
      );
    },
    isLoggedIn() {
      return !!this.$store.state.jwt;
    },
    isInCart() {
      return !!this.$store.state.cart.find(
        p => p.id === parseInt(this.$route.params.id)
      );
    }
  },
  methods: {
    getProduct() {
      fetch(`http://localhost:3000/products/${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => {
          this.$store.commit("updateProduct", data);
        })
        .catch(err => console.log(err));
    },
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
    removeFromCart() {
      this.$store.commit("removeFromCart", this.product);
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>