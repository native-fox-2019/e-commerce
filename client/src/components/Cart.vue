<template>
  <div class="cart-container">
    <div class="cart-wrapper" :class="{ enter: isOpen }">
      <div class="cart">
        <div class="cart-header">
          <div class="cart-header-padded">
            <button @click="openCart(false)" class="arrow-btn">
              <i class="fas fa-arrow-right fa-3x">
            </i></button>
            <h4>{{ cart.length }} on cart</h4>
          </div>
        </div>

        <div class="cart-body">
          <div v-for="product in cart" :key="product.id" class="cart-item-container">
            <div class="cart-item">
              <div class="cart-item-product">
                <div class="image-container">
                  <div class="aspect-ratio">
                    <img :src="product.image_url" alt="">
                  </div>
                </div>

                <div class="details-container">
                  <div class="product-details">
                    <p class="product-details-name">{{ product.name }}</p>
                    <p class="product-details-size">Size: 10</p>
                  </div>

                  <div class="product-stock">
                    <div v-if="product.Cart">
                      <a
                        @click="onAdd(
                          product.id, product.Cart.quantity, product.stock, product.price
                        )">
                        +</a>
                      <p>{{ product.Cart.quantity }}</p>
                      <a @click="onSubtract(product.id, product.Cart.quantity, product.price)">
                        -</a>
                    </div>

                    <div v-if="product.quantity">
                      <a @click="onAdd(product.id, product.quantity, product.price)">+</a>
                      <p>{{ product.quantity }}</p>
                      <a @click="onSubtract(product.id, product.quantity, product.price)">-</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-item-price">
                <div @click="remove(product.id, product.price)" class="remove">+</div>
                <p>IDR {{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="order-summary">
            <div class="order-summary-item">
              <h4>Subtotal</h4>
              <p>IDR {{ cartSubtotal }}</p>
            </div>
          </div>
          <a @click="onCheckout" class="btn">CHECKOUT</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Cart',
  created() {
    if (this.isOpen) {
      this.fetchCart();
    }
  },
  computed: mapGetters(['isOpen', 'cart', 'cartSubtotal']),
  methods: {
    ...mapActions(['fetchCart', 'removeProduct', 'updateQuantity', 'checkOut', 'fetchProducts']),
    ...mapMutations(['openCart']),
    remove(id, price) {
      this.removeProduct({ id, price });
    },

    async onAdd(id, quantity, stock, price) {
      let newQuantity = quantity + 1;
      if (stock === quantity) {
        newQuantity = quantity;
      }
      const obj = {
        quantity: newQuantity,
      };
      await this.updateQuantity({
        id, obj, price,
      });
    },

    async onSubtract(id, quantity, price) {
      let newQuantity;
      if (quantity === 1) {
        newQuantity = quantity;
      } else {
        newQuantity = quantity - 1;
      }

      const obj = {
        quantity: newQuantity,
      };
      await this.updateQuantity({
        id, obj, price,
      });
    },

    async onCheckout() {
      await this.checkOut();
      this.fetchProducts();
    },
  },
};
</script>

<style scoped>
  .bg-modal {
    position: absolute;
    height: 152%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999999999;
    display: none;
  }

  .open {
    display: block;
  }

  .cart-container {
    z-index: 9999999999;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cart-wrapper {
    position: fixed;
    z-index: 10000;
    right: 0;
    top: 0;
    height: 100%;
    width: 480px;
    overflow-y: visible;
    background-color: white;
    transform: translate3d(480px, 0, 0);
    transition: all 250ms ease-out 0s;
  }

  .cart-wrapper.enter {
    transform: translate3d(0, 0, 0);
  }

  .cart {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 480px;
    justify-content: space-between;
    background-color: white;
  }

  .cart-header, .cart-body, .cart-footer {
    position: relative;
  }

  .cart-header {
    text-align: center;
    flex-shrink: 0;
    height: 100px;
  }

  .cart-header-padded {
    padding: 24px 24px;
    position: relative;
    height: 100%;
  }

  .arrow-btn {
    position: absolute;
    top: 24px;
    left: 24px;
    outline: none;
    border-style: none;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  .cart-body {
    position: relative;
    overflow: auto;
    height: 100%;
  }

  .cart-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .cart-item-product {
    display: flex;
    overflow: hidden;
    padding: 24px 12px 24px 24px;
  }

  .cart-item-product
  .image-container {
    width: 105px;
    margin-right: 24px;
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

  img {
    max-width: 100%;
    color: transparent;
  }

  .product-details {
    margin-bottom: 12px;
  }

  .product-details-name {
    line-height: 20px;
    font-size: 16px;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 9px;
  }

  .product-details-size {
    line-height: 20px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  .cart-item-price {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 24px 12px 24px 12px;
  }

  .remove {
    font-size: 42px;
    transform: rotate(45deg);
    cursor: pointer;
  }

  .cart-footer {
    position: relative;
    flex-shrink: 0;
    padding: 0px 24px 24px;
    width: 100%;
    height: 30%;
  }

  .order-summary {
    padding: 24px 0px;
  }

  .order-summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .btn {
    display: block;
    cursor: pointer;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    padding: 13px 18px;
    border: 2px solid black;
    text-decoration: none;
    border-radius: 2px;
    width: 100%;
  }

  .product-stock {
    display: block;
  }

  .product-stock
  a {
    cursor: pointer;
  }
</style>
