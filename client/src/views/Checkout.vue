<template>
<div>
    <UserNavbar/>

    <div class="tablebox">
        <h2>Order Summary</h2>
        <table class="table">
        <thead class="thead">
            <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in this.$store.state.cartList" :key="data.id">
            <td><img :src='data.Product.image_url'></td>
            <td>{{ data.Product.name }}</td>
            <td>Rp. {{ data.Product.price.toLocaleString('ID') }}</td>
            <td>
            <input type="button" class="btn btn-danger" value="Delete"
            v-on:click.prevent="deleteCarts(data.id)">
            </td>
            </tr>
        </tbody>
        <tbody>
            <tr class="bottom">
                <td></td>
                <td></td>
                <td>Total</td>
                <td>Rp. {{ this.$store.state.total.toLocaleString('ID') }}</td>
            </tr>
        </tbody>
    </table>
    </div>
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
    deleteCarts(id) {
      this.$store.state.cartList.forEach((element) => {
        if (element.id === id) {
          this.$store.state.eachCart = element;
          console.log(this.$store.state.eachCart);
        }
      });
      this.$store.dispatch('deleteCart', id);
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
  background: white;
  margin : 10px auto;
}
.tablebox{
  margin : 40px auto;
  text-align: center;
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
h2{
    text-align: center;
    font-family: 'Lato';
    font-weight: 300;
}
</style>
