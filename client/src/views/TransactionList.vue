<template>
<div class="col-10 container" style="margin-top: 100px;">
  <v-alert v-if="err" type="error">
    {{errMsg}}
  </v-alert>
    <tr class="row">
      <td class="col-1">No.</td>
      <td class="col">name</td>
      <td class="col-1">Stock</td>
      <td class="col">Image</td>
      <td class="col">Price</td>
      <td class="col">Quantity</td>
      <td class="col">Total</td>
      <td class="col">Action</td>
    </tr>
  <!-- <hr> -->
    <tr class="row borderBtm" v-for="(transaction,i) in transactions" :key="transaction.id">
      <td class="col-1">{{i + 1}}</td>
      <td class="col">{{transaction.Product.name}}</td>
      <td class="col-1">{{transaction.Product.stock}}</td>
      <td class="col">
       <img :src="transaction.Product.urlImage" alt="" style="width: 100px; height:100px;">
        </td>
      <td class="col">
        {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.Product.price)}}
        </td>
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
        {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.quantity * transaction.Product.price)}}
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
        <v-btn color="success" @click.prevent="buy(transactions)">
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
        {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalHarga)}}
      </td>
      <td class="col"></td>
    </tr>

</div>
</template>

<script>
  export default {
    name: "tableProducts",
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
      transactions() {
        return this.$store.state.transactions
      },
    },
    watch: {
      transactions() {
        let totalPrice = 0
        this.transactions.forEach(element => {
          totalPrice += element.quantity * element.Product.price
        });
        this.totalHarga = totalPrice
      }
    },
    methods: {
      minus(id, quantity, ProductId){
        this.$axios({
          url: '/transaction/'+id,
          method: "PATCH",
          headers: ({token: localStorage.getItem("token")}),
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
        this.$axios({
          url: '/transaction/' +id,
          headers: ({token: localStorage.getItem("token")}),
          method: "PATCH",
          data: {
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
          this.$axios({
            url: '/checkout/' + el.Product.id,
            method: "PATCH",
            headers: ({token : localStorage.getItem('token')}),
            data: {
              stock: el.Product.stock - el.quantity
            }
          })
          .then(() => {
            this.$axios({
              url: '/transaction/'+ el.id,
              method: "DELETE",
              headers: ({token : localStorage.getItem("token")})
            })
            .then(()=>{
              this.$store.dispatch("get")
              this.$store.commit("successCheckout")
              this.$router.push({name: "Home"})
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
        this.$axios({
          url: '/transaction/' +id,
          method: "DELETE",
          headers: ({token: localStorage.getItem("token")})
        })
        .then(() =>{
          this.$store.dispatch("getAllTransaction")
        })
        .catch(({response})=>{
          console.log(response);
        })
      }
    },
  }
</script>

<style>
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
/* td {
    font-size: 12px;
    padding: 4px 7px 2px;
    vertical-align: bottom;
    border-right: 1px solid #DFDFDF;
    white-space:nowrap;
} */

</style>