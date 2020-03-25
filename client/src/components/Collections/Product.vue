<template>
  <div class="container">
    <div class="product">
      <div class="product-child">
        <div class="product-child-name">
          <h2 class="typography-h2">Men's Shoes</h2>
        </div>
        <div class="product-child-results">
          <div class="product-child-result">
            <a class="product-link">
              <div class="product-image-container">
                <div class="aspect-ratio">
                  <img src="https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_265,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_FY19_August_PDP_WL_RN_Savanna_Night_LAT_9dbb2f9d-8a67-4fcc-a0fe-1bcc2a28e2eb.png?v=1571655947" alt="" class="product-image">
                </div>
              </div>
              <div class="product-title">
                <p class="typography-title">Natural Grey (Light Grey Sole)</p>
              </div>
              <p class="typography-price">IDR 300000</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Product',
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
</style>
