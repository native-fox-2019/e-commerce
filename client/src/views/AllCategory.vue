
<template>
<div>
  <Navbar></Navbar>
<div class="row ml-3 mb-5">
  <div class="title container text-center mt-5">
    <h2>Product List</h2>
  </div>
  <v-card
  class="cards"
    :loading="loading"
    v-for="product in products" :key="product.id"
    width= 23%
    style="margin-left: 17px;">
    <div justify=center align=center >
        <v-img
          width=300px
          height=300px
          :src="product.image_url"
        ></v-img>
        <v-card-title>{{product.name}}</v-card-title>
    </div>
    <v-divider class="mx-4"></v-divider>
    <v-card-title> stock : {{product.stock}}</v-card-title>
    <v-card-text>
      PRICE $ : {{product.price}} M
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click.prevent="detail(product)"
        color="deep-purple lighten-2"
        text
      >
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
<div class="img">
<img src="https://www.boeing.com/resources/boeingdotcom/home/home-COVID-19-update2-roadblock-1500x260.jpg" alt="">
</div>
  </div>
</div>
</template>



<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
  export default Vue.extend ({
    name : 'AllCategory',
    components : {
      Navbar,
      Footer
    },
    data: () => ({
      loading: false,
      selection: 1,
    }),
     computed : {
      products () {
        return this.$store.state.products.data
      }
    },
    created() {
      this.$store.dispatch('findAll')
    },
    methods : {
      detail(product) {
        this.$router.push({path : `/detail/${product.id}`})


      }
    }
  })
</script>
<style scoped>

.cards {
  /* margin-left: 20px; */
  margin-top: 60px;
  width: 20%;
  position: relative;
  transition: 320ms ease;
  border-radius: 20px;
  margin-bottom: 20px;
}
.cards:hover{
  transform: scale(1.08);
  margin: 15px;
  /* background-color: black; */
}

.row {
  margin-top: 0;

}
.title {
margin-top: 100px;
margin-bottom: 60px;
}
.img {
  margin-bottom: 50px;
  margin-top: 30px;
}
/* .cards:hover{
} */
</style>



