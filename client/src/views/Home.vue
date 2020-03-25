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
      <b-row>
          <b-card
            title="Sepatu hehe"
            img-src="/sepatu.jpg"
            img-alt="Image"
            class="mb-4 col-sm-3 ml-5"
            v-for="i in [1,2,3,4,5]" :key="i"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>

            <router-link to="/product">
              <b-button variant="primary">Go somewhere</b-button>
            </router-link>
          </b-card>
      </b-row>
      <b-row class="justify-content-md-center mb-5"> 
        <button class="btn btn-success">View more product</button>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>
  .shoes-carousel-img{
    width: 100%;
    height: 480px;
  }
  
</style>