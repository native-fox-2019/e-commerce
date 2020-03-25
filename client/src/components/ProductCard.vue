<template>
  <div class="card">
    <img :src="product.image_url" style="margin-bottom: 15px" width="100%" height="55%">
    <router-link :to="link">
    <div class="card-name">
      <span>{{ product.name }}</span>
    </div>
    </router-link>
    <div class="card-price">
      <span>Rp{{ product.price }}</span>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';

export default {
  props: ['product'],
  data() {
    return {
      message: '',
      link: {
        name: 'Product',
        params: { id: this.product.id },
      },
    };
  },
  methods: {
  },
};
</script>
