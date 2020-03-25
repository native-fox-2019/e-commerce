<template>
  <div class="nav">
      <div class="navLeft">
        <router-link to="/adminregister" class="navTitle" > Das Comic's </router-link>
      </div>
      <div class="navRight">
      <router-link to="/" class="navPadding">Home</router-link>
      <router-link v-if="$store.state.isAdmin==='user'"
      to="/cart" class="navPadding">Carts</router-link>
      <router-link to="/login" class="navPadding"
      v-if="!$store.state.isLogin" >Login</router-link>

      <router-link to="/register" class="navPadding"
      v-if="!$store.state.isLogin" >register</router-link>

      <div v-else class="divelse">
      <router-link v-if="$store.state.isAdmin==='admin'" to="/adminpage"
      class="navPadding">Admin Menu </router-link>
      <a class="navPadding" @click="logout">Logout</a>
      <!-- <router-link to="/login" class="navPadding"  >Logout</router-link>  -->
      </div>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('level');
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },

  created() {
    console.log(this.$store.state.isLogin, 'ini isLogin');
    console.log(this.$store.state.isAdmin, 'ini isAdmin');
  },

  computed: {
    // getIsLogin() {
    //   let a = null;
    //   if (localStorage.getItem('token')) {
    //     a = true;
    //   } else {
    //     a = false;
    //   }
    //   return a;
    // },
    // getIsAdmin() {
    //   let a = null;
    //   if (localStorage.getItem('level') === 'admin') {
    //     a = true;
    //   } else {
    //     a = false;
    //   }
    //   return a;
    // },
  },
};
</script>
