<template>
  <div id="app">
    <Navbar />
    <Cart />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Cart from './components/Cart.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Cart,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  padding: 0 10px;
  margin: 0 auto;
}
</style>
