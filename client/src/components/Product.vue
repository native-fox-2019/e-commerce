<template>
<div>
    <div class="view d-flex row justify-content-center">
          <div
          class="card col-2 ml-3 mb-3"
          style="width: 18rem;"
          v-for="data in this.$store.state.userProduct"
          :key="data.id"
          >
              <img class="card-img-top" :src="data.image_url" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">{{ data.name }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Price : Rp.{{ data.price.toLocaleString('ID') }}</li>
              </ul>
              <div class="card-body d-flex justify-content-center row">
                  <div class="ltp" v-if="ltp">
                    <input type="button" class="btn btn-warning"
                    v-on:click.prevent="deleteProduct(data.id)" value="Login to Purchase">
                  </div>
                  <div class="atc" v-if="atc">
                    <input type="button" class="btn btn-warning"
                    v-on:click.prevent="addToCarts(data.id)" value="add to cart">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>

export default {
  name: 'Product',
  components: {
  },
  data() {
    return {
      elementEdit: '',
      ltp: !this.$store.state.usertoken,
      atc: this.$store.state.usertoken,
    };
  },
  created() {
    this.userProducts();
  },
  methods: {
    userProducts() {
      this.$store.dispatch('Products');
    },
    addToCarts(id) {
      this.$store.state.userProduct.forEach((element) => {
        if (element.id === id) {
          this.$store.state.eachProduct = element;
        }
      });
      this.$store.dispatch('addToCart', id);
    },
  },
};
</script>
<style scoped>
.view {
    width: 100%;
    padding-top: 20px;
}

</style>
