<template>
  <div>
    <div class="mb-3">
      <h3>
        <u>LOUIS VUITTON</u>
      </h3>
    </div>
    <div class="d-flex-justify-content-space-between flex-warp">
      <b-button pill variant="success" @click.prevent="Logout" class="float-right mr-5">Logout</b-button>
<img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/louis-vuitton-logo-29-prar-kulasekara.jpg" alt="LV" height="42" width="42">
      <b-button pill variant="primary" @click.prevent="Cart" class="float-left ml-5">Cart</b-button>
    </div>
    <div></div>
    <div class="mt-5">
      <div class="row ml-auto mr-auto">
        <div class="col-4" v-for="product in $store.state.products" :key="product.id">
          <Customer :PropProduct="product"></Customer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Customer from "../components/Customer";
export default {
  components: {
    Customer
  },
  created() {
    this.$store.dispatch("getAllProducts");
  },
  methods: {
    Cart() {
      this.$router.push("cart");
    },
    Logout() {
      localStorage.clear();
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>