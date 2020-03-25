<template>
  <div class="category">
    <div class="container">
      <h2 class="my-4">{{ $route.params.category }}</h2>
      <hr />
      <div class="row my-3">
        <div
          class="col-12 col-xl-2 col-lg-3 col-md-4 col-sm-6"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card">
            <img v-bind:src="product.image_url" class="card-img-top" alt="product.name" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">Rp {{ product.price.toLocaleString("id") }}</p>
              <router-link
                :to="'/product/' + product.id"
                class="btn btn-danger stretched-link"
              >Lihat</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    products() {
      return this.$store.state.products.filter(p => p.category === this.$route.params.category);
    }
  },
  methods: {
    getAllProduct() {
      fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
          this.$store.commit("setProducts", data);
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getAllProduct();
  }
};
</script>
