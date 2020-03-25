<template>
  <div>
    <div class="divAdmin mb-3">
      <a class="btn btn-success" @click.prevent="Cart">Cart</a>
    </div>
    <div>
      <a class="btn btn-secondary" @click.prevent="logout()">Logout</a>
    </div>
<div class="container">
    <div class="divCenter row">
      <CardProductUser class="col-6 mx-3 my-3" v-for="data in $store.state.products" :key="data.id" :data="data"></CardProductUser>
    </div>
</div>

  </div>
</template>
<script>
import CardProductUser from "../components/CardProductUser.vue";
export default {
  components: {
    CardProductUser
  },
  methods: {
    Cart() {
      this.$router.push("cartMain");
    },
    logout() {
      localStorage.clear();
      this.$router.push("loginPage");
    }
  },
  created() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>