<template>
  <div class="account">
    <div v-if="isLoggedIn === true" class="my-2 my-lg-0">
        <router-link to="/cart" class="btn text-light my-2 my-sm-0">
            <i class="fas fa-shopping-cart"></i>
        </router-link>
      <button
        type="button"
        class="btn btn-outline text-light my-2 my-sm-0"
        v-on:click="logout"
      >Logout</button>
    </div>
    <div v-else class="my-2 my-lg-0">
      <router-link to="/login" class="btn btn-outline text-light my-2 my-sm-0">Login</router-link>
      <router-link to="/register" class="btn btn-outline text-light my-2 my-sm-0">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  computed: {
    isLoggedIn() {
      return !!this.$store.state.jwt;
    }
  },
  methods: {
    logout() {
      this.$store.commit("deleteJwt");
    }
  }
};
</script>