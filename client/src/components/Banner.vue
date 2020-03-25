<template>
<div class="px-5">
  <b-card>
    <div>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        controls
        indicators
        :interval="4000"
        img-width="1240"
        img-height="360"
      >
        <b-carousel-slide
          caption="First slide"
          img-src="https://picsum.photos/1240/360/?image=1"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Second Slide"
          img-src="https://picsum.photos/1240/360/?image=2"
        ></b-carousel-slide>
        <b-carousel-slide
          caption="Third Slide"
          img-src="https://picsum.photos/1240/360/?image=3"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  </b-card>
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

</style>