<template>
<div>
    <UserNavbar/>
    <table class="table">
    <thead class="thead">
        <tr>
        <th scope="col">Product</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="data in this.$store.state.cartList" :key="data.id">
        <td><img :src='data.Product.image_url'></td>
        <td>{{ data.Product.name }}</td>
        <td>Rp. {{ data.Product.price.toLocaleString('ID') }}</td>
        </tr>
    </tbody>
    <tbody>
        <tr class="bottom">
            <td></td>
            <td>Total</td>
            <td>Rp. {{ (20000000).toLocaleString('ID') }}</td>
        </tr>
    </tbody>
</table>
</div>
</template>
<script>
import UserNavbar from '../components/UserNavbar.vue';

export default {
  name: 'Checkout',
  components: {
    UserNavbar,
  },
  data() {
    return {
    };
  },
  created() {
    this.cartLists();
  },
  methods: {
    cartLists() {
      this.$store.dispatch('getCart');
      console.log(this.$store.state.cartList);
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);
.table {
  width: 80%;
  text-align: center;
  font-family: 'Lato';
  font-weight: 300;
  margin : 100px auto;
  background: white;
  padding: 15px;
}
.thead{
    background-color: rgb(5, 5, 5);
    color: white;
}
.bottom{
    font-weight: 400;
    background-color: #c8c8c8;
    color: black;
}
img{
    width: 50px;
    height: 50px;
}
</style>
