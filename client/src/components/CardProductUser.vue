<template>
<div class="itemContainer border">
  <div class="titleContainer">
  <span class="itemTitle"> {{this.data.name}}</span>
  </div>
  <div class="descriptionContainer row">
      <img :src="this.data.image_url" style="width:120px; height:170px;">
      <div class="col">
      <span> price : RP {{this.data.price}}</span>
      </div>
      
      <div class="col">
      <span> stock : {{this.data.stock}} </span>
      </div>
      <div>
        <button @click.prevent="AddCart" type="button">Add to Cart</button>

      </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2"

export default {
  props: ['data'],
  data() {
    return {
      id: this.data.id,
      name: this.data.name,
      amount: 0,
      usersId: this.data.usersId,
      image_url: this.data.image_url,
      price:this.data.price
    };
  },
methods: {

      AddCart() {
        axios({
          method: "post",
          url: `http://localhost:3000/carts`,
          headers: {
            token: localStorage.getItem("token")
          },
          data: {
          name: this.name,
          amount: 1,
          id: this.id,
          usersId: this.usersId,
          image_url: this.image_url,
          price: this.price
          }
        })
        .then(response=> {
          this.$store.dispatch("holdCartItem", response.data)
        })
      }
  }
}
</script>