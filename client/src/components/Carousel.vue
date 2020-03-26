
<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" 
      >
     <b-carousel-slide
      caption=""
      img-src="https://desktopwalls.net/wp-content/uploads/2014/06/Boeing%20Aircraft%20Plane%20On%20Runway%20Free%20Wallpaper%20HD.jpg"
    >
        <router-link to="/login">
      <div v-if="!isLogin">
      <h3 style="color:white">please login to see our product</h3>
      <button type="button" class="btn btn-outline-light" style="border-radius:50px; width:130px; height:43px;"><h4>Login</h4></button>
        </div>
        </router-link>
    </b-carousel-slide>
     <b-carousel-slide
      caption=""
      img-src="https://airbus-h.assetsadobe2.com/is/image/content/dam/channel-specific/website-/products-and-services/aircraft/airbus-passenger-aircraft-family-formation2.png?wid=1920&fit=fit,1&qlt=85,0"
    >
      <h1>The Best Commercial</h1>
    </b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="https://images.unsplash.com/photo-1517429128955-67ff5c1e29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    >
     <h2>KLM is our Loyal Patner</h2></b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="https://airbus-h.assetsadobe2.com/is/image/content/dam/products-and-solutions/commercial-helicopters/h125/EXPH-1985-99.jpg?wid=1920&fit=fit,1&qlt=85,0"
    >
    <h2>How are large-scale SAR operations coordinated?</h2>
    <h4>
      Tim Ochsner, Chief Pilot of the Texas Department of Public Safety (DPS), explains the key to the success of the SAREX (search and rescue exercise)
    </h4>
    </b-carousel-slide>
    <b-carousel-slide
      caption=""
      img-src="https://airbus-h.assetsadobe2.com/is/image/content/dam/products-and-solutions/military-aircraft/a400m/A400M_Masks_Getafe%20(8).jpg?wid=1920&fit=fit,1&qlt=85,0"
    >
    <h2>Airbus A400M transports masks to Indonesia in support of COVID-19 crisis efforts </h2>
    </b-carousel-slide>
   </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    computed : {
      isLogin() {
        return this.$store.state.isLogin
      }
    },
  
    created () {
      this.sliding
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
<style>
.w-100 {
    width: 100% !important;
    height: 680px !important;
}
</style>