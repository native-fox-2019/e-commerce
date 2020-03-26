<template>
  <div id="app">
    <Navbar />
    <Statistics />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./views/Navbar.vue";
import Statistics from "./views/Statistics.vue";

export default {
  name: 'App',
  components: {
    Navbar,
    Statistics
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
