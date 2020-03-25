<template>
  <div>
    <b-carousel id="shoes-carousel"  img-width="1024" img-height="100" controls indicators :interval="4000">
        <b-carousel-slide>
           <template v-slot:img>
          <img
            class="shoes-carousel-img"
            src="/banner.jpg"
            alt="image slot"
          >
        </template>
        </b-carousel-slide>
        <b-carousel-slide>
           <template v-slot:img>
          <img
            class="shoes-carousel-img"
            src="/banner.jpg"
            alt="image slot"
          >
        </template>
        </b-carousel-slide>
    </b-carousel>
    <div class="container">
      <h1 class="font-weight-bold mt-3">Our Product</h1>
      <Loading v-if="isLoading" />
      <div v-else>
      <b-row>
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </b-row>
      <b-row class="justify-content-md-center mb-5">
        <router-link to="/product">
          View more product
        </router-link> 
      </b-row>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data(){
    return {
      products:[]
    }
  },
  computed:mapGetters(['isLoading']),
  created(){
    var self=this
    this.$store.dispatch('loadHomeProducts')
    .then((data)=>{
      self.products=data
    })
  },
  components: {
    Loading,
    ProductCard
  }
}
</script>

<style scoped>
  .shoes-carousel-img{
    width: 100%;
    height: 480px;
  }
  
</style>