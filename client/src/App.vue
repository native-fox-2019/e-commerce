<template>
  <div id="app">
    <Login></Login>
    <Register></Register>
    <Navbar></Navbar>
    <router-link to="/"></router-link>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Login,
    Register
  },
  created(){
    this.checkLoginStart()
  },
  computed: mapState([
    'dataProducts'
  ]),
  methods: {
    checkLoginStart(){
        if(localStorage.getItem('token')){
            this.$store.dispatch('loginState')
        }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
