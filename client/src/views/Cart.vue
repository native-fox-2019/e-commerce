<template>
<div>
    <Navbar></Navbar>
<div class="col-10">
  <v-alert v-if="err" type="error" class="checkout">
    {{errMsg}}
  </v-alert>
    <tr class="">
      <td class="col`">No.</td>
      <td class="col">name</td>
      <td class="col">Stock</td>
      <td class="col">Image</td>
      <td class="col">Price</td>
      <td class="col">Quantity</td>
      <td class="col">Total</td>
      <td class="col">Action</td>
    </tr>
  <!-- <hr> -->
    <tr class=" borderBtm" v-for="(transaction,i) in allTransaction" :key="transaction.id">
      <td class="col">{{i + 1}}</td>
      <td class="col">{{transaction.Product.name}}</td>
      <td class="col">{{transaction.Product.stock}}</td>
      <td class="col"><img :src="transaction.Product.image_url" alt=""></td>
      <td class="col">{{transaction.Product.price}}</td>
      <td class="col buttons">
        <div>
        <v-btn icon @click.prevent="minus(transaction.id, transaction.quantity, transaction.Product.id)">
          <v-icon >mdi-minus-circle</v-icon>
        </v-btn>
        {{transaction.quantity}}
        <v-btn icon @click.prevent="plus(transaction.id, transaction.quantity, transaction.Product.id)">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
        </div>
      </td>
      <td class="col buttons">
        $ {{transaction.quantity * transaction.Product.price}} M
      </td>
      <td class="col">
        <v-btn  color="error" @click.prevent="cancel(transaction.id)">
          <v-icon>
          mdi-trash-can
          </v-icon>
          Cancel
        </v-btn>
      </td>
    </tr>
    <tr>
      <td class="col">
        <v-btn color="success" @click.prevent="buy(allTransaction)">
          <v-icon>
          mdi-cash-multiple
          </v-icon>
          CheckOut!
        </v-btn>
      </td>
      <td class="col"></td>
      <td class="col"></td>
      <td class="col"></td>
      <td class="col">Total</td>
      <td class="col"></td>
      <td class="col">
      $ {{totalHarga}} M
      </td>
      <td class="col"></td>
    </tr>
</div>
</div>
</template>
<script>
    import Vue from 'vue'
    import Navbar from '../components/Navbar'
    import axios from 'axios'
    import url from '../../config/config'
  export default Vue.extend ({
    name: "tableProducts",
    components : {
        Navbar
    },
    data() {
      return {
        quantity: 1,
        err: false,
        errMsg: "Not enough Stock!!!",
        totalHarga: 0
      }
    },
    created() {
      this.$store.dispatch("getAllTransaction")
    },
    computed: {
      allTransaction() {
        return this.$store.state.allTransaction
      },
    },
    watch: {
      allTransaction() {
        let totalPrice = 0
        this.allTransaction.forEach(element => {
          totalPrice += element.quantity * element.Product.price
        });
        this.totalHarga = totalPrice
      }
    },
    methods: {
      minus(id, quantity, ProductId){
        axios({
          url: `${url}/transaction/${id}`,
          method: "PATCH",
          headers: {
            token : localStorage.getItem('token')
          },
          data: {
            quantity: quantity-1,
            ProductId: ProductId
          },
        })
        .then(() => {
          this.$store.dispatch("getAllTransaction")
        })
        .catch(({response})=>{
          this.err = true
          this.errMsg = "Click cancel if you won't to buy this stuff"
          console.log(response);
        })
      },
      plus(id, quantity, ProductId) {
        console.log(id, quantity, ProductId)
        axios({
          url: `${url}/transaction/${id}`,
          method: "PATCH",
          headers: {
            token : localStorage.getItem('token')
          },
          data: {
            id: id,
            quantity: quantity+1,
            ProductId: ProductId
          }
        })
        .then(data=>{
          this.$store.dispatch("getAllTransaction")
          console.log(data);
        })
        .catch(({response})=>{
          this.err = true,
          this.errMsg = "Stock is not enough!!"
          console.log(response);
        })
      },
      buy(data) {
        data.forEach(el =>{
          axios({
            url: `${url}/checkout/${el.Product.id}`,
            method: "PATCH",
            headers: {
              token : localStorage.getItem('token')
            },
            data: {
              stock: el.Product.stock - el.quantity
            }
          })
          .then(() => {
            axios({
              url: `${url}/transaction/${el.id}`,
              method: "DELETE",
               headers: {
              token : localStorage.getItem('token')
            }
            })
            .then(()=>{
              // this.$store.dispatch("get")
              // this.$store.commit("successCheckout")
              this.$router.push({path : '/allCategory'})
            })
            .catch(({response})=>{
              console.log(response);
            })
          })
          .catch(({response})=>{
            console.log(response);
          })
        })
      },
      cancel(id) {
        axios({
          url: `${url}/transaction/${id}`,
          method: "DELETE",
          headers: {
            token : localStorage.getItem('token')
          },
        })
        .then(() =>{
          this.$store.dispatch("getAllTransaction")
        })
        .catch(({response})=>{
          console.log(response);
        })
      }
    },
  })
</script>
<style scoped>
.roundBtn{
  border-radius: 10px;
}
.buttons {
  display: flex;
  justify-content: flex-start;
}
.borderBtm {
  border-bottom: solid 1px black;
}
img{
  width: 200px !important;
  height: 200px !important;
}
</style>