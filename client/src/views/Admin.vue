<template>
  <div>
    <div class="mb-3">
      <h3>
        <u>Admin Panel</u>
      </h3>
    </div>
    <div class="d-flex-justify-content-space-between flex-warp">
      <b-button pill variant="success" @click.prevent="Logout" class="float-right mr-5">Logout</b-button>
      <b-button
        pill
        variant="primary"
        @click.prevent="$router.push('/product')"
        class="float-left ml-5"
      >Product</b-button>
    </div>
    <div></div>
    <div class="mt-5">
      <div class="row ml-auto mr-auto">
        <div class="col-4" v-for="user in $store.state.userArr" :key="user.id">
          <adminList :PropProduct="user"></adminList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminList from "../components/adminList";
export default {
  components: {
    adminList
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>