<template>
    <div id="nav" class="navbar bg-dark justify-content-start">
      <div class="Home mr-3" v-if="!this.$store.state.token">
        <router-link to="/">Home</router-link>
      </div>
      <router-link to="/panel">Admin Panel</router-link>
      <div class="Add ml-3" v-if="this.$store.state.token">
        <router-link to="/add">Add Product</router-link>
      </div>
    </div>
</template>
<script>
export default {
  name: 'AdminNavbar',
};
</script>
