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
                    <span v-if="!isOutOfStock">Stock: {{stock}}</span>
                    <span v-if="isOutOfStock">Out of Stock</span>
                </div>
                <div class="add-to-cart">
                    <span>Input the amount:</span><br>
                    <form @submit.prevent="addCart">
                        <input type="number" min="1" :max="stock" v-model="amount"><br>
                        <button type="submit">Add To Cart</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import swal from 'sweetalert';

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
      isOutOfStock: false,
      amount: 1,
    };
  },
  watch: {
    amount() {
      if (this.amount > this.stock) {
        this.amount = this.stock;
      } else if (this.amount < 0) {
        this.amount = 1;
      }
    },
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
          if (this.stock === 0) {
            this.isOutOfStock = true;
          }
          this.image_url = response.data.product.image_url;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addCart() {
      if (!this.$store.state.isLogin) {
        this.$router.push('/login');
      } else {
        const options = {
          url: `${this.$store.state.baseUrl}/cart`,
          method: 'post',
          data: {
            amount: this.amount,
            ProductId: this.$route.params.id,
          },
          headers: {
            token: localStorage.token,
          },
        };
        axios(options)
          .then(({ data }) => {
            console.log(data);
            swal(data.message);
            this.$router.push('/cart');
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    },
  },
};
</script>
