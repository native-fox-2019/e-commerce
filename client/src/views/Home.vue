<template>
  <div class="home">
    <Navbar />
    <div id="carouselExampleIndicators" class="carousel slide" style="padding-top : 8vh" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#fisrt" data-slide-to="0" class="active"></li>
      <li data-target="#second" data-slide-to="1"></li>
      <li data-target="#third" data-slide-to="2"></li>
      <li data-target="#fifth" data-slide-to="3"></li>
      <li data-target="#fourth" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner" style="max-height : 56vh">
      <div class="carousel-item active">
        <img src="https://www.pomptonsportcenter.net/media/bannerlibrary_SHOP%20STREET.jpg" class="d-block w-100" alt="first" style="opacity : 90%">
      </div>
      <div class="carousel-item">
        <img src="https://d2bywgumb0o70j.cloudfront.net/2019/07/05/c07994d456c98dc517d82d6ed9aa99f7_a8eeb06ed481c11a.jpg" class="d-block w-100" alt="second" style="opacity : 90%">
      </div>
      <div class="carousel-item">
        <img src="https://camperglass.co.uk/wp-content/uploads/2016/07/CG-Delivery-Banner-1.jpg" class="d-block w-100" alt="third" style="opacity : 90%; height : 56vh">
      </div>
      <div class="carousel-item">
        <img src="https://cdn.shopify.com/s/files/1/2543/9560/files/Rizoma-banner_1_1200x.jpg?v=1565251485" class="d-block w-100" alt="fifth" style="opacity : 90%">
      </div>
      <div class="carousel-item">
        <img src="https://www.durhamrescuemission.org/wp-content/uploads/2020/03/COVID-19-Page-Banner_2880x976.png" class="d-block w-100" alt="fourth" style="opacity : 90%">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
    <img class="img mt-0 p-0" alt="" src="../assets/logo.png" style="width : 20%;">
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
