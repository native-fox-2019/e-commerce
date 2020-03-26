<template>
  <div>
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <Success v-show="success.status" :success="success" @hide="success.status=!success.status"/>
    <div class="container">
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
const url = 'http://localhost:3000'
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
        methood: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
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
