<template>
    <div class="page">
    <div class="product">
        <p style="text-align: center; font-weight: 500; font-size: 25px"
        v-if="isLoading">LOADING...<p>
        <div class="product-content" v-if="!isLoading">
            <div class="product-image">
            <img :src="image_url" width="300px" height="auto">
            </div>
            <div class="product-details">
            <div class="product-name">
                <h2>{{name}}</h2>
            </div>
            <div class="product-price">
                <span>Rp{{price}}</span>
            </div>
            <div class="product-stock">
                <span>Stock: {{stock}}</span>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Product',
  props: ['data'],
  created() {
    this.getProduct();
    this.$store.commit('setPage', 'product');
    if (localStorage.role === 'admin') {
      this.isAdmin = true;
    }
  },
  data() {
    return {
      id: 0,
      message: '',
      name: '',
      price: 0,
      stock: 0,
      image_url: '',
      isLoading: true,
    };
  },
  methods: {
    getProduct() {
      const options = {
        url: `${this.$store.state.baseUrl}/products/${this.$route.params.id}`,
        method: 'get',
      };
      axios(options)
        .then((response) => {
          this.id = response.data.product.id;
          this.name = response.data.product.name;
          this.price = response.data.product.price;
          this.stock = response.data.product.stock;
          this.image_url = response.data.product.image_url;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
