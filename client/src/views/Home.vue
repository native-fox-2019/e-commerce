<template>
  <div class="home">
    <div class="home-wrapper">
      <Carousel />
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
  },
};
</script>
