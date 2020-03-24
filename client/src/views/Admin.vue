<template>
<div>
  <AdminNavbar></AdminNavbar>
  <div class="home">
    <img alt="logo" src="../assets/logowatch.png">
    <HelloWorld/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import AdminNavbar from '../components/AdminNavbar.vue';

export default {
  name: 'Admin',
  components: {
    HelloWorld,
    AdminNavbar,
  },
};
</script>
<style scoped>
  img{
    width: 20%;
    height: 20%;
  }
</style>
