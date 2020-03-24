<template>
  <div style="height: 60px; position: fixed; width: 100%; top: 0;" class="bg-dark">
    <button class="btn btn-primary"
    style="left: 20px; top: 10px; position: fixed"
    @click.prevent="showCart">
      Cart
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
  }
}
</script>