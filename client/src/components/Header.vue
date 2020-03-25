<template>
    <div class="header">
        <div class="header-content">
            <div class="title">
                <span>Footsalt.com</span>
            </div>
            <div class="nav">
                <router-link to="/" :class="{active: isHome}">Home</router-link>
                <router-link to="/login" :class="{active: isSignin}"
                    v-if="!$store.state.isLogin">Sign In
                </router-link>
                <router-link to="/register" :class="{active: isRegister}"
                    v-if="!$store.state.isLogin">Register
                </router-link>
                <a href="/#" v-if="$store.state.isLogin">Cart</a>
                <a href="/#" v-if="$store.state.isLogin" @click="logOut">Sign Out</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isHome: false,
      isSignin: false,
      isRegister: false,
    };
  },
  computed: {
    ...mapState(['page']),
  },
  watch: {
    page() {
      if (this.page === 'home') {
        this.isHome = true;
        this.isSignin = false;
        this.isRegister = false;
      } else if (this.page === 'login') {
        this.isHome = false;
        this.isSignin = true;
        this.isRegister = false;
      } else if (this.page === 'register') {
        this.isHome = false;
        this.isSignin = false;
        this.isRegister = true;
      } else {
        this.isHome = false;
        this.isSignin = false;
        this.isRegister = false;
      }
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      this.$store.commit('changeIsLogin', false);
      this.$router.push('/');
    },
  },
};
</script>
