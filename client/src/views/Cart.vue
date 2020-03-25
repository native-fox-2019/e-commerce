<template>
  <div>
    <div class="mb-3">
      <h3>
        <u>My Cart</u>
      </h3>
    </div>
    <div class="d-flex-justify-content-space-between flex-warp">
      <b-button pill variant="success" @click.prevent="Logout" class="float-right mr-5">Logout</b-button>
      <b-button pill variant="primary" @click.prevent="checkout">checkout</b-button>
      <b-button
        pill
        variant="warning"
        @click.prevent="$router.push('/')"
        class="float-left ml-5"
      >Back</b-button>
    </div>
    <div></div>
    <div class="mt-5">
      <div class="row ml-auto mr-auto">
        <div class="col-3" v-for="product in $store.state.customerCart" :key="product.id">
          <Cart :PropProduct="product"></Cart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "../components/Cart";
import axios from "axios"
import Swal from 'sweetalert2';

export default {
  components: {
    Cart
  },
  created() {
    this.$store.dispatch("getAllProductsCart");
  },
  methods: {
    Add() {
      this.$router.push("add");
    },
    Logout() {
      localStorage.clear();
      this.$router.push("login");
    },
    checkout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.checkoutAction()
          Swal.fire("yeay thank you!", "success");
        }
      });
    },
    checkoutAction() {
      let products = this.$store.state.products;
      let checkout = this.$store.state.checkOutItem;
      let cart = this.$store.state.customerCart;

      for (let j = 0; j < checkout.length; j++) {
        for (let i = 0; i < products.length; i++) {
          if (checkout[j].productsId == products[i].id) {
              products[i].stock - checkout[j].amount
          }
        }
      }
        for(let k = 0; k<checkout.length; k++){
            for(let l =0; l<cart.length; l++){
                if(checkout[k].id == cart[l].id){
                    cart = cart.filter(item => item.id != item.id)
                }
            }
        }
        for(let m = 0; m<checkout.length; m++){
            axios({
            url:"http://localhost:3000/cart/" +checkout[m].id,
            method:"DELETE",
            headers:{token: localStorage.getItem("tokenAdmin")|| localStorage.getItem("tokenCustomer")}
        })
        .then(() => {
            this.$router.push("/thankyou")
        })
        }

        for(let n = 0; n<checkout.length; n++){
            for(let o = 0; o<products.length; o++){
                if(checkout[n].productsId==products[o].id){
                axios({
                url:`http://localhost:3000/product/${products[o].id}`,
                method:"PUT",
                data:{
                    stock: products[o].stock =products[o].stock - checkout[n].amount
                },
                headers:{token: localStorage.getItem("tokenAdmin")||localStorage.getItem("tokenCustomer")}
            }).then(() =>{
                
            })
                }
            }
           
        }
        
    }

  }

};
</script>

<style>
</style>