<template>
  <div>
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <Success v-show="success.status" :success="success" @hide="success.status=!success.status"/>
    <div>
      <div class="container d-flex justify-content-center">
        <b-card
        v-for="product in products" :key="product.id"
        :title="product.Product.name"
        :img-src="product.Product.imageURL"
        img-top
        style="max-width: 20rem; margin: 1vh"
        class="mb-2 shadow p-3 mb-5 bg-white rounded">
          <b-card-text>
            <h6>{{product.Product.price}}</h6>
            <h4 v-if="product.amount">amount: {{product.amount}} pcs</h4>
          </b-card-text>
        </b-card>
      </div>
      <div class="checkout">
        <button @click="checkout" class="button">checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import Alert from '../components/Alert'
import Success from '../components/SuccessAlert'
import axios from 'axios'
// const url = 'https://cryptic-inlet-94242.herokuapp.com/'
const url = 'http://localhost:3000'
export default {
  name: 'Cart',
  components: {
    Alert,
    Navbar,
    Success
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
  computed: {
    products () {
      return this.$store.state.products
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
          console.log(data)
          this.success.status = true
          this.success.msg = data.data.message
        })
        .catch(err => {
          this.isError.status = false
          this.isError.msg = err.response.data.msg
        })
    },
    getCart () {
      this.$store.dispatch('getAll')
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style>

</style>
