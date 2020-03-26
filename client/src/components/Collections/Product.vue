<template>
  <div class="container">
    <div v-if="$route.path === '/collections/mens'" class="product">
      <div class="product-child">
        <div class="product-child-name">
          <h2 class="typography-h2">Men's Shoes</h2>
        </div>
        <div class="product-child-results">
          <div v-for="product in menProducts" :key="product.id" class="product-child-result">
            <a class="product-link">
              <div class="product-image-container">
                <div class="aspect-ratio">
                  <img :src="product.image_url" alt="" class="product-image">
                  <button v-if="product.stock === 0" class="sold-out-btn">Sold Out</button>
                  <button v-if="getStatus && product.stock !== 0"
                    @click.prevent="onAddToCart(product.id)"
                    class="product-image-btn">
                    Add To Cart</button>
                  <button v-if="!getStatus && product.stock !== 0"
                    @click.prevent="goToLogin" class="product-image-btn">
                    Login First</button>
                </div>
              </div>
              <div class="product-title">
                <p class="typography-title">{{ product.name }}</p>
              </div>
              <p class="typography-price">Stock {{ product.stock }}</p>
              <p class="typography-price">IDR {{ product.price }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="$route.path === '/collections/womens'" class="product">
      <div class="product-child">
        <div class="product-child-name">
          <h2 class="typography-h2">Women's Shoes</h2>
        </div>
        <div class="product-child-results">
          <div v-for="product in womenProducts" :key="product.id" class="product-child-result">
            <a class="product-link">
              <div class="product-image-container">
                <div class="aspect-ratio">
                  <img :src="product.image_url" alt="" class="product-image">
                  <button v-if="product.stock === 0" class="sold-out-btn">Sold Out</button>
                  <button v-if="getStatus && product.stock !== 0"
                    @click.prevent="onAddToCart(product.id)"
                    class="product-image-btn">
                    Add To Cart</button>
                  <button v-if="!getStatus && product.stock !== 0"
                    @click.prevent="goToLogin" class="product-image-btn">
                    Login To Purchase</button>
                </div>
              </div>
              <div class="product-title">
                <p class="typography-title">{{ product.name }}</p>
              </div>
              <p class="typography-price">Stock {{ product.stock }}</p>
              <p class="typography-price">IDR {{ product.price }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Product',
  created() {
    this.fetchProducts();
    this.checkStatus();
    this.setOnHome(false);
  },
  computed: mapGetters(['menProducts', 'womenProducts', 'getStatus']),
  methods: {
    ...mapMutations(['setOnHome']),
    ...mapActions(['fetchProducts', 'addToCart', 'checkStatus']),
    onAddToCart(id) {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
      } else {
        this.addToCart(id);
      }
    },

    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
  .product {
    padding: 0px 48px;
    margin-top: 54px;
  }

  .product-child {
    margin-bottom: 60px;
  }

  .product-child-name {
    margin-bottom: 25px;
  }

  .typography-2 {
    color: black;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 25px;
  }

  .product-child-results {
    display: flex;
    flex-wrap: wrap;
  }

  .product-child-result {
    width: 25%;
    padding: 0px 12px 36px;
  }

  .product-image-container {
    margin-bottom: 12px;
    width: 100%;
  }

  .aspect-ratio {
    position: relative;
    padding-bottom: 100%;
  }

  .aspect-ratio > * {
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: block;
    position: absolute;
  }

  .product-image {
    max-width: 100%;
    color: transparent;
    transition: all 300ms ease-in-out 0s;
    z-index: 1;
  }

  .product-image-btn {
    position: absolute;
    height: 37px;
    width: 100px;
    top: 75%;
    left: 30%;
    border-radius: 14%;
    background-color: black;
    color: white;
    cursor: pointer;
    z-index: 0;
    opacity: 0;
    transition: all 300ms ease-in-out 0s;
  }

  .sold-out-btn {
    position: absolute;
    font-size: 19px;
    height: 37px;
    width: 100%;
    z-index: 888;
    background-color: black;
    color: white;
  }

  .product-title {
    margin-bottom: 6px;
  }

  .typography-title {
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 15px;
    color: black;
  }

  .typography-price {
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 15px;
    color: black;
  }

  /* .product-link {
    cursor: pointer;
  } */

  .product-link:hover
  .product-image {
    opacity: 0.5;
  }

  .product-link:hover
  .product-image-btn {
    opacity: 1;
    z-index: 3;
  }
</style>
