<template>
    <div class="productlist">
    <Navbar />
    <h1 style="color : white; padding-top: 5%" class="nav-link" id="productlist">Product List</h1>
    <div class="container overflow-auto" style="max-height : 83vh">
      <div class="card-columns">
        <div v-for="item in products" :key="item.id" class="card" style="opacity : 90%">
          <img :src=item.image_url class="card-img-top" alt="" style="height : 50%; width : 50%">
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <h5 class="card-text">Price : Rp. {{item.price.toLocaleString()}}</h5>
            <h5 class="card-text">Stock : {{item.stock}}</h5>
            <form @submit.prevent="addCart(item.id, item.price, item.name, amount)">
            <div class="form-group ml-4" style="width : 80%">
                <label for="email_login" style="color : black">Order Amount :</label>
                <input placeholder="0" style="color : black; width : 65%" type="number" class="form-control ml-5" v-model="amount[Number(item.id)]" min="1" :max="item.stock" required>
            </div>
            <button type="submit" class="btn btn-info mb-3">Add To Cart</button>
            </form>
            <p class="card-text">Updated at {{item.updatedAt.toLocaleString().substring(0,10)}}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
let url = `http://localhost:3000`
// let url = 'https://powerful-meadow-02119.herokuapp.com'
export default {
  computed : mapState(['products']),
  name: 'Home',
  components: {
    Navbar
  },
  data () {
    return {
      amount : {},
    }
  },
  created () {
    this.$store.dispatch('getProduct')
  },
  methods : {
    addCart(id, price, name){
        let totals = this.amount[id] * price
        let ids = id
        let amounts = this.amount[id]
        if(localStorage.getItem('token')){
            axios({
                method : 'post',
                url : `${url}/cart/addcart`,
                headers : {
                access_token : localStorage.getItem('token')
                },
                data : {
                amount : amounts,
                total : totals,
                id : ids
                }
            })
            .then(()=>{
                Swal.fire({
                position: 'top-end',
                icon: `success`,
                title: `Success add ${name} to your card`,
                showConfirmButton: false,
                timer: 2500
                })
                this.amount = {}
            })
            .catch(err=>{
              console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: `Sorry ${err.response.data.message}`,
                    // text: 'You can edit in ',
                })
                this.amount = {}
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: `Sorry you have to login first`,
                // text: 'You can edit in ',
            })
            this.amount = {}
        }
    }
  }
}
</script>

<style scoped>
.productlist{
    background-image: url('../assets/home.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center
}
</style>