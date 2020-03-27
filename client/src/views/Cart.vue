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
            <div>
              <h6>{{product.Product.price}}</h6>
            </div>
            <div>
              <a v-if="product.amount === product.Product.stocks ? false : true" @click.prevent="increaseAmount(product.Product.id, product)" href>
              <i class="fas fa-plus-circle"></i>
              </a>
              <h4 v-if="product.amount">amount: {{product.amount}} pcs</h4>
              <a v-if="product.amount !== 0 ? true : false" @click.prevent="decreaseAmount(product.Product.id, product)" href>
              <i class="fas fa-minus-circle"></i>
              </a>
              <a v-if="product.amount === 0 ? true : false" @click.prevent="deleteProduct(product.id)" href>
              <i class="fas fa-trash-alt"></i>
              </a>
            </div>
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
  created () {
    this.getCart()
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
          this.$store.dispatch('getCart')
          this.success.status = true
          this.success.msg = data.data.message
        })
        .catch(() => {
          this.isError.status = false
          this.isError.msg = 'checkout failed'
        })
    },
    getCart () {
      this.$store.dispatch('getAll')
    },
    decreaseAmount (id, product) {
      axios({
        url: `${url}/user/cart/${id}`,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          UserId: product.UserId,
          ProductId: product.ProductId,
          amount: product.amount - 1
        }
      })
        .then(() => {
          this.$store.dispatch('getCart')
        })
        .catch(err => {
          if (Array.isArray(err.response.data)) {
            this.isError.msg = err.response.data.msg.join(', ')
          } else {
            this.isError.msg = err.response.data.msg
          }
          this.isError.status = true
        })
    },
    increaseAmount (id, product) {
      axios({
        url: `${url}/user/cart/${id}`,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          UserId: product.UserId,
          ProductId: product.ProductId,
          amount: product.amount + 1
        }
      })
        .then(() => {
          this.$store.dispatch('getCart')
        })
        .catch(err => {
          if (Array.isArray(err.response.data)) {
            this.isError.msg = err.response.data.msg.join(', ')
          } else {
            this.isError.msg = err.response.data.msg
          }
          this.isError.status = true
        })
    },
    deleteProduct (id) {
      axios({
        url: `${url}/user/cart/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => this.$store.dispatch('getCart'))
        .catch(() => {
          this.isError.status = true
          this.isError.msg = 'cant delete this product'
        })
    }
  }
}
</script>

<style>
i:hover {
  transform: scale(1.08);
  cursor: pointer;
}
</style>
