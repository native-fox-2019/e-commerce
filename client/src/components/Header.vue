<template>
    <div class="header">
        <div class="header-content">
            <div class="title">
                <router-link to="/">
                    <span style="color: white">Footsalt.com</span>
                </router-link>
            </div>
            <div class="nav">
                <router-link to="/" :class="{active: isHome}">Home</router-link>
                <router-link to="/login" :class="{active: isSignin}"
                    v-if="!$store.state.isLogin">Sign In
                </router-link>
                <router-link to="/register" :class="{active: isRegister}"
                    v-if="!$store.state.isLogin">Register
                </router-link>
                <router-link to="/cart" v-if="$store.state.isLogin"
                    :class="{active: isCart}">Cart
                </router-link>
                <a href="/#" v-if="$store.state.isLogin" @click="logOut">Sign Out</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import swal from 'sweetalert';

export default {
  data() {
    return {
      isHome: false,
      isSignin: false,
      isRegister: false,
      isCart: false,
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
        this.isCart = false;
      } else if (this.page === 'login') {
        this.isHome = false;
        this.isSignin = true;
        this.isRegister = false;
        this.isCart = false;
      } else if (this.page === 'register') {
        this.isHome = false;
        this.isSignin = false;
        this.isRegister = true;
        this.isCart = false;
      } else if (this.page === 'cart') {
        this.isHome = false;
        this.isSignin = false;
        this.isRegister = false;
        this.isCart = true;
      } else {
        this.isHome = false;
        this.isSignin = false;
        this.isRegister = false;
        this.isCart = false;
      }
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem('token');
      this.$store.commit('changeIsLogin', false);
      swal('Successfully signed out');
      this.$router.push('/');
    },
  },
};
</script>
