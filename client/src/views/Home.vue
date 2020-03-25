<template>
<div>
<div class="nav">
<Navbar></Navbar>
</div>
<div id="home">
<div class="cel">
<Carousel></Carousel>
</div>
<div class="banner">
  <Banner></Banner>
</div>
<div class="category">
  <Category></Category>
</div>
<div class="tambahan">
  <Tambahan></Tambahan>
</div>
<div class="footer">
<Footer></Footer>
</div>
</div>
</div>
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Banner from '../components/Banner'
import Category from '../components/Category'
import Tambahan from '../components/Tambahan'
import Footer from '../components/Footer'
export default Vue.extend ({
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    Banner,
    Category,
    Tambahan,
    Footer
  }
})
</script>
<style scoped>

</style>
