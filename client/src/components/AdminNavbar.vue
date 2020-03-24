<template>
  <div style="height: 60px; position: fixed; width: 100%; top: 0; z-index: 1000;" class="bg-dark">
    <button class="btn btn-primary"
    style="left: 20px; top: 10px; position: fixed"
    @click.prevent="addProductForm">
      Add Product
    </button>
    <button class="btn btn-danger"
    style="right: 20px; top: 10px; position: fixed;"
    @click.prevent="logoutUser">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser');
    },
    addProductForm() {
      this.$router.push('/add');
    }
  }
}
</script>