<template>
  <div>
    <AdminNavbar></AdminNavbar>
    <img alt="logo" src="../assets/logowatch.png">
    <div class="panel">
    <h3> Welcome Back Admin! </h3>
              <router-link to="/admin/view">
              <input type="button" class="btn btn-dark" value="View Product">
              </router-link>
              <router-link to="/admin/add">
              <input type="button" class="btn btn-dark" value="Add Product">
              </router-link>
              <input type="button" class="btn btn-warning" value="Logout" v-on:click="logout">
    </div>
  </div>
</template>
<script>
import AdminNavbar from '../components/AdminNavbar.vue';

export default {
  name: 'Panel',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      email: '',
      password: '',
    };
  },
  components: {
    AdminNavbar,
  },
  created() {

  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.state.token = null;
      this.$router.push({ name: 'Admin' });
    },
  },
};
</script>
<style scoped>
.panel {
  border-color: black;
  border-style : double;
  width: 35%;
  text-align: center;
  margin : 20px auto;
  background: white;
  padding: 15px;
}
.btn-dark {
  margin-top: 20px;
  margin-left : 15px;
  padding-left: 15px;
}
.btn-warning {
  margin-top: 20px;
  margin-left : 15px;
  padding-left: 15px;
}
img{
  width: 20%;
  height: 20%;
}
</style>
