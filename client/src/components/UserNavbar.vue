<template>
    <div id="nav" class="navbar">
     <div class="d-flex justify-content-start">
        <div class="Home mr-3">
            <router-link to="/">Home</router-link>
        </div>
     </div>
     <div class="d-flex justify-content-center">
         <h4>LxWtch</h4>
     </div>
     <div class="d-flex justify-content-end">
        <div class="Login ml-3" v-if="!this.$store.state.usertoken">
            <router-link to="/login">Login</router-link>
        </div>
        <div class="Login ml-3" v-if="!this.$store.state.usertoken">
            <router-link to="/register">Register</router-link>
        </div>
        <div class="cart ml-3" v-if="this.$store.state.usertoken">
        {{ this.$store.state.cartList.length }}
        </div>
        <div class="Login ml-1" v-if="this.$store.state.usertoken">
            <router-link to="/cart">Cart</router-link>
        </div>
        <div class="Add ml-3" v-if="this.$store.state.usertoken">
            <div style="cursor:pointer" class="logout" v-on:click.prevent="logout">Logout</div>
        </div>
     </div>
    </div>
</template>
<script>
import swal from 'sweetalert';

export default {
  name: 'UserNavbar',
  methods: {
    logout() {
      swal({
        title: 'Are you sure want to logout?',
        buttons: true,
        dangerMode: true,
      })
        .then((willLogout) => {
          if (willLogout) {
            this.$store.state.usertoken = null;
            localStorage.removeItem('token');
            swal({
              icon: 'success',
              title: 'Logout success, see you again.',
            });
            this.$router.push({ name: 'UserLogin' });
          } else {
            swal('Logout cancelled');
            this.$router.push({ name: 'Home' });
          }
        });
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Caveat&display=swap);
@import url(https://fonts.googleapis.com/css?family=Baloo+2&display=swap);

h4{
    font-family: 'Caveat';
    font-size: 30px;
    color: white;
}
#nav{
  background-color: rgb(5, 5, 5);
  height: 80px;
}
.logout{
    color: white;
}
.cart{
  color: white;
  font-family: 'Baloo 2';
}
</style>
