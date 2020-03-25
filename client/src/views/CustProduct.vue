<template>
<div>
  <div>
    <h2>This is Customer page</h2>
    <button @click="logout" type="button" class="btn btn-danger">Logout</button>
  </div>
    <div class="cart">
        <h2>Your cart</h2>
        <div class="mycart">
            <div v-for="cart in mycart" :key="cart.id" class="cartproduk">
                <form>
                    <div style="font-weight:bold; font-size:10px">Status order:{{cart.CustomerProduct.status_order}}</div>
                    <div class="produkname">{{cart.name}}</div>
                    <div>Qty order:{{cart.CustomerProduct.quantity}}</div>
                    <button @click="addqty(cart.id)" type="button">+</button>
                    <button @click="delqty(cart.id)" type="button">-</button><br>
                    <img :src="cart.image_url">
                    <div>
                        <button @click="order(cart.id, cart.CustomerProduct.quantity)" type="submit">Confirm order</button><br>
                        <button @click="withdraw(cart.id)" type="submit">Cancel order</button><br>
                        <button @click="remove(cart.id)" type="button">Remove Item</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  <h1>Available Products:</h1>
  <p>Select product to add in your cart</p>
    <div style="color:red">{{error.data}}</div>
  <div class="products">
    <div class="produk" v-for="produk in products" :key="produk.id">
        <div class="produkname">{{produk.name}}</div>
        <img :src="produk.image_url">
        <div>Rp{{produk.price}},00</div>
        <div>Stock: {{produk.stock}}</div>
        <button @click="addcart(produk.id)" type="button">Add To Mycart</button><br>
    </div>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
let local = "http://localhost:3000"
export default {
  data(){
        return {
            error: '',
            products: [],
            mycart:[]
        }
  },
  created(){
    this.getProducts()
    this.getMycart()
  },
  computed:{
    
  },
  methods:{
    getProducts(){
      axios.get(`${local}/products/show`)
      .then(result=>{
        //console.log(result.data)
        this.products = result.data
      })
      .catch(err=>{
        this.error=err
      })
    },
    logout(){
            localStorage.removeItem('token')
            window.location.replace('/logincust')
    },
    getMycart(){
        let token = localStorage.getItem('token')
        console.log(token)
        axios({
                method: "get",
                url: `${local}/customer/showcart`,
                headers: {token: token}
        })
        .then(result=>{
            console.log("sukses")
            console.log(result)
            this.mycart = result.data.Products
        })
        .catch(err=>{
        this.error=err
      })
    },
    addcart(id){
        console.log(id)
        let token = localStorage.getItem('token')
        console.log(token)
        axios({
                method: "post",
                url: `${local}/customer/addcart/${id}`,
                headers: {token: token}
        })
        .then(result=>{
            console.log("sukses")
            console.log(result.data)
            //this.product.push(result.data)
            window.location.replace('/custproduct')
        })
        .catch(err=>{
            console.log(err)
            this.error=err.response
        })
    },

    remove(id){
        console.log(id)
        let token = localStorage.getItem('token')
        axios({
                method: "delete",
                url: `${local}/customer/delete/${id}`,
                headers: {token: token}
        })
        .then(result=>{
            console.log('sukses delete')
            console.log(result)
            window.location.replace('/custproduct')
        })
        .catch(err=>{
            this.error=err.data
        })
    },
    addqty(id){
        console.log(id+"<<id")
        let newqty = ''
        let newcart =[]
        for (let i=0; i<this.mycart.length; i++){
            console.log(this.mycart[i])
            if(this.mycart[i].id===id){
                newqty=this.mycart[i].CustomerProduct.quantity+1
                if(newqty>this.mycart[i].stock){
                    newqty=this.mycarti[i].stock
                }
                this.mycart[i].CustomerProduct.quantity = newqty
            }
            newcart.push(this.mycart[i])
        }
        this.mycart = newcart
    },

    delqty(id){
        console.log(id+"<<id")
        let newqty = ''
        let newcart =[]
        for (let i=0; i<this.mycart.length; i++){
            console.log(this.mycart[i])
            if(this.mycart[i].id===id){
                newqty=this.mycart[i].CustomerProduct.quantity-1
                if(newqty<1){
                    newqty=1
                }
                this.mycart[i].CustomerProduct.quantity = newqty
            }
            newcart.push(this.mycart[i])
        }
        this.mycart = newcart
    },

    order(id, quantity){
        let token = localStorage.getItem('token')
        console.log(quantity)
        axios({
                method: "post",
                url: `${local}/customer/order/${id}`,
                data: {
                    quantity:quantity,
                    status_order: true},
                headers: {token: token}
        })
        .then(result=>{
            console.log(result)
            window.location.replace('/custproduct')
        })
        .catch(err=>{
            this.error=err.data
        })
    },

    withdraw(id){
        let token = localStorage.getItem('token')
        axios({
                method: "post",
                url: `${local}/customer/order/${id}`,
                data: {
                    status_order: false},
                headers: {token: token}
        })
        .then(result=>{
            console.log(result)
            window.location.replace('/custproduct')
        })
        .catch(err=>{
            this.error=err.data
        })
    }

  }


}
</script>

<style>
.cart {
    text-align: center;
    background-color: lightblue;
    min-height: 200px;
    margin : 20px 80px;
    padding: 20px 80px
}

.mycart {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center
}

.cartproduk {
    margin: 10px;
    padding: 10px;
    border: 5px solid blue;
    background-color: lightblue;
}

.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center
}

.produk {
  margin: 10px;
  padding: 10px;
  border: 5px solid blue;
  background-color: lightblue;
}

.produkname {
  color: blue;
  font-weight: bold
}

img {
  width: 120px;
  height: 120px
}

</style>
