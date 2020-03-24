<template>
<div>
    <div id="nav" class="navbar">
     <div class="d-flex justify-content-start">
        <div class="Home mr-3">
            <router-link to="/">Home</router-link>
        </div>
     </div>
     <div class="d-flex justify-content-end">
        <div class="Login ml-3" v-if="!this.$store.state.usertoken">
            <router-link to="/login">Login</router-link>
        </div>
        <div class="Login ml-3" v-if="!this.$store.state.usertoken">
            <router-link to="/panel">Register</router-link>
        </div>
        <div class="Add ml-3" v-if="this.$store.state.usertoken">
            <router-link to="/add">Add Product</router-link>
        </div>
     </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'UserNavbar',
};
</script>
<style scoped>
#nav{
  background-color: rgb(5, 5, 5);
}
</style>
