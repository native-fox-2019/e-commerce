<template>
  <div>
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <Success v-show="success.status" :success="success" @hide="success.status=!success.status"/>
    <div class="container">
        <b-card
        v-for="product in products" :key="product.id"
        :title="product.name"
        :img-src="product.imageURL"
        img-top
        style="max-width: 20rem; margin: 1vh"
        class="mb-2 shadow p-3 mb-5 bg-white rounded">
        <b-card-text>
          <h6>{{product.price}}</h6>
          <h4>{{product.stock}}</h4>
        </b-card-text>
        <b-button variant="primary">add to cart</b-button>
      </b-card>
      <ProductsCard/>
      <div class="checkout">
        <button class="button">checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import Alert from '../components/Alert'
import Success from '../components/SuccessAlert'
import ProductsCard from '../components/products-card'
import axios from 'axios'
// const url = 'https://cryptic-inlet-94242.herokuapp.com/'
const url = 'http://localhost:3000/'
export default {
  name: 'Cart',
  components: {
    Alert,
    Navbar,
    Success,
    ProductsCard
  },
  data () {
    return {
      success: {
        status: false,
        msg: ''
      },
      isError: {
        status: false,
        msg: ''
      }
    }
  },
  methods: {
    checkout () {
      axios({
        url: `${url}/user/checkout`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          console.log('sukses checkout')
          this.success.status = true
          this.success.msg = data.data.message
        })
        .catch(err => {
          this.isError.status = false
          this.isError.msg = err.response.data.msg
        })
    }
  }
}
</script>

<style>

</style>
