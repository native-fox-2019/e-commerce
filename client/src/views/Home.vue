<template>
  <div class="home">
    <Navbar/>
    <Alert v-show="isError.status" :isError="isError" @hide="isError.status=!isError.status"/>
    <Success v-show="success.status" :success="success" @hide="success.status=!success.status"/>
    <Banner/>
    <div>
      <b-modal id="modal-1" title="Add To Cart">
          <form @submit.prevent="addToCart(id)">
            <div>
              <label for="amount">AMOUNT</label>
            </div>
            <div>
              <input type="number" name="amount" v-model="amount">
            </div>
            <div> <button type="submit">add now</button></div>
          </form>
      </b-modal>
    </div>
    <div class="container">
      <div class="add-container">
      </div>
      <div>
        <h1>Products List</h1>
      </div>
      <div class="card-container">
        <b-card
          v-for="product in products" :key="product.id"
          :title="product.name"
          :img-src="product.imageURL"
          img-top
          style="max-width: 20rem; margin: 1vh"
          class="mb-2 shadow p-3 mb-5 bg-white rounded">
          <b-card-text>
            <h6>{{product.price}}</h6>
            <h4>available: {{product.stocks}}</h4>
          </b-card-text>
          <b-button v-if="product.stocks>0" @click="setId(product.id)" v-b-modal.modal-1>add to cart</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
import axios from 'axios'
import Alert from '../components/Alert'
import Banner from '../components/Banner'
import Success from '../components/SuccessAlert'
const url = 'http://localhost:3000'
// const url = 'https://cryptic-inlet-94242.herokuapp.com/'

export default {
  name: 'Home',
  components: {
    Navbar,
    Banner,
    Success,
    Alert
  },
  data () {
    return {
      amount: 0,
      isError: {
        status: false,
        msg: ''
      },
      success: {
        stats: false,
        msg: ''
      },
      id: null
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    add () {
      this.$router.push({ name: 'Add' })
    },
    edit (id) {
      this.$router.push(`/edit/${id}`)
    },
    addToCart (id) {
      axios({
        url: `${url}/user/addtocart/${id}`,
        method: 'post',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          amount: this.amount
        }
      })
        .then(data => {
          this.success.status = true
          this.success.msg = data.data.message
        })
        .catch(err => {
          this.isError.status = true
          this.isError.msg = err.response.data.message
        })
    },
    setId (id) {
      this.id = id
    }
  },
  created () {
    this.$store.dispatch('getAll')
  }
}
</script>

<style>
.detail h2 {
  margin: 0;
  margin-top: 10px;
  min-height: 5vh;
  color: #6D435A;
}
.detail {
  border-radius: 10px;
  background-color: whitesmoke;
  overflow-y: auto ;
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
}
.add-container {
  margin-bottom: 5vh;
  margin-top: 15vh;
}
.card-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center ;
  align-items: center;
}
.card:hover {
  transform: scale(1.08) ;
  box-shadow: 1vh 1vh gray;
}
.add {
  border-radius: 10px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center ;
  border-radius: 10px;
  margin: 2.5vh;
  width: 20vw;
  cursor: pointer;
  height: 55vh;
  border: 2px solid ;
  justify-content: center;
  align-items: center;
}
.home {
  min-height: 100vh;
  color: #6D435A;
}
img {
  width: 20vw;
  height: 30vh;
  border-radius: 10px;
}
.remove-btn button{
  color: red;
  border:2px red;
}
.remove-btn:hover {
  transform: scale(1.08);
}
</style>
