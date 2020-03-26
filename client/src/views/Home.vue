<template>
  <div class="home">
    <Navbar />
    <img class="img mt-0 p-0" alt="" src="../assets/logo.png" style="width : 55%;">
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {

    }
  },
  methods : {
  }
}
</script>

<style scoped>
.home{
    background-image: url('../assets/home.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center
}
.img { 
  filter: invert(100%); 
  -webkit-filter:red(80%); 
  } 
</style>
