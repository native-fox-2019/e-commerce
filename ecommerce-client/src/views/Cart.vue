<template>
  <div class="divCenter-column">
    <h1 style="font-family: rale-reg">{{this.name}}'s Cart</h1>
    <div style="overflow-y:auto; height:300px" class="">
      <table style="font-family:">
        <tr>
          <td> Product Name </td>
          <td> details </td>
          <td> Amount </td>
          <td> price </td>
          <td> Total </td>
          <td> Confirm </td>
        </tr>
        <tr v-for="(data, i) in $store.state.carts" :key="i">
          <td>{{data.Product.name}}</td>
          <td> <img :src="data.Product.image_url" style="width:95px; height:150px"> </td>
          <td> {{data.amount}} Unit</td>
          <td> {{data.Product.price}}</td>
          <td> {{data.amount * data.Product.price}}</td>
          <td> <a @click="axDel(data.id)" class="btn">CheckOut!</a> </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: localStorage.getItem('name'),
    };
  },
  created() {
    this.$store.dispatch('getCarts');
  },
  methods: {
    axDel(params) {
      console.log(params);
      axios({
        method: 'delete',
        headers: { token: localStorage.getItem('token') },
        url: `${this.$store.state.axiosUrl}/cart/${params}`,
      }).then((data) => {
        console.log(data.data);
        this.$store.dispatch('getCarts');
      }).catch((err) => {
        console.log(err.response);
      });
    },
  },
};
</script>
