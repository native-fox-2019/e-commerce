<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  created() {
    if (localStorage.token) {
      this.$store.commit('changeIsLogin', true);
      this.$store.commit('setName', localStorage.name);
    }
  },
};
</script>
