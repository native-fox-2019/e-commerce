<template>
  <div class="collection">
    <Banner />
    <Product />
  </div>
</template>

<script>
import Banner from '../components/Collections/Banner.vue';
import Product from '../components/Collections/Product.vue';

export default {
  name: 'Collections',
  components: {
    Banner,
    Product,
  },
};
</script>

<style scoped>
  /* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  } */

  .collection {
    position: relative;
    padding-top: 60px;
    padding-bottom: 100px;
  }
</style>
