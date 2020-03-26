<template>
  <div>
    <b-carousel id="shoes-carousel"  img-width="1024" img-height="100" controls indicators :interval="4000">
        <b-carousel-slide v-for="banner in banners" :key="banner.id">
        <template v-slot:img>
            <img
              class="shoes-carousel-img"
              :src="banner.name"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>
    </b-carousel>
    <hr>
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
      products:[],
      banners:[],
      currPage:1
    }
  },
  computed:mapGetters(['isLoading']),
  created(){
    this.loadHomeProduct(this.currPage)
  },
  components: {
    Loading,
    ProductCard
  },
  methods:{
    loadMore(){
      this.currPage++;
      this.loadHomeProduct()

    },
    loadHomeProduct(){
      var self=this
      this.$store.dispatch('loadHomeProducts')
      .then((data)=>{
        self.products=data
      })
      this.banners=[
        {
          name:'https://static.nike.com/a/images/f_auto/dpr_2.0/w_1407,c_limit/78af191c-52dd-4fc3-a8fd-7bbba8040642/mens-shoes-clothing-accessories.jpg'
        },
        {
          name:'https://static.nike.com/a/images/f_auto/dpr_2.0/w_1407,c_limit/6002e752-16e9-4f95-b22f-d718a073ca18/nike-just-do-it.jpg'
        }
      ]
      // this.$store.dispatch('loadBanners')
      // .then((data)=>{
      //   self.banners=data
      // })
    }
  }
}
</script>

<style scoped>
  .shoes-carousel-img{
    width: 100%;
    height: 480px;
  }
  
</style>