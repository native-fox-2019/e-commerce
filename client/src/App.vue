<template>
  <div id="app">
      <Navbar />
      <Cart />
      <router-view/>
      <Footer />
    <div class="bg-modal" :class="{ open: isOpen }">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: mapGetters(['isOpen']),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container {
  max-width: 1200px;
  padding: 0 10px;
  margin: 0 auto;
}

.bg-modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

.open {
  display: block;
}
</style>
