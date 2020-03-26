<template>
    <v-toolbar
      color="brown darken-3"
      dark
      style="
      position: fixed;
      z-index: 2;
      width: 100vw;
      "
    >
    <img src="http://cddevel.com/assets/logo.svg" alt="" style="height: 100%">
      <v-toolbar-title>Coffee-Break</v-toolbar-title>

      <v-spacer></v-spacer>
      <div  class="icon-container">
          <loginBtn v-if="!token"></loginBtn>
          <registerBtn v-if="!token"></registerBtn>
          <logoutBtn v-if="token" v-on:logOut="logOut"></logoutBtn>
          <cartBtn v-if="token" v-on:toHome="toHome"></cartBtn>
          <homeBtn v-if="token" v-on:toCart="toCart"></homeBtn>
        </div>
    </v-toolbar>
</template>

<script>
import loginBtn from '../components/loginBtn.vue';
import registerBtn from '../components/registerBtn.vue';
import logoutBtn from "../components/logoutBtn.vue";
import cartBtn from '../components/cartBtn.vue';
import homeBtn from "../components/homeBtn.vue";

export default {
  name: "loginPage",
  data() {
    return {
      changePage: true,
    }
  },
  components: {
    loginBtn,
    registerBtn,
    logoutBtn,
    cartBtn,
    homeBtn
  },
  computed: {
    token() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toLoginPage() {
      this.$router.push({name: "Login"})
    },
    logOut() {
      console.log("woeeee");
      localStorage.removeItem("token")
      this.$router.push({name: 'Home'})
    },
    toAdmin() {
      this.$router.push({path: '/admins'})
      this.changePage = true
    },
    toHome() {
      this.changePage = false
    },
    toCart() {
      this.changePage = true
    }
  }
}
</script>
<style>
.icon-container{
  width: 200px;
  display: flex;
  justify-content: space-around;
}
</style>