<template>
  <div id="bannerBesar">
    <!-- {{listBanners}} -->
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner" style="height:300px">
        <div class="carousel-item active">
          <img
            src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190912152727-uglyleaddd.jpg"
            class="d-block w-100"
            alt
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-summer-trends-1578930915.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
            class="d-block w-100"
            alt
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://scstylecaster.files.wordpress.com/2019/09/2020-fashion-trends-feature.jpg"
            class="d-block w-100"
            alt
          />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BigSlide",
  data() {
    return {
      // bannerHere: this.listBanners
    };
  },
  computed: {
    listBanners() {
      let arr = this.$store.state.dataProducts;
      let temp = [];
      arr.forEach(item => {
        if (item.CategoryId === 5) {
          temp.push({
            id: item.id,
            image: item.image_url
          });
        }
      });
      return temp;
    },
    created() {
      this.$store.dispatch("getAll");
    }
    // mounted() {
    //   console.log(this.bannerHere);
    // }
  }
};
</script>

<style>
</style>