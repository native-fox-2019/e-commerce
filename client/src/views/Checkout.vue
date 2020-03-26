<template>
<div>
    <UserNavbar/>
    <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="tablebox">
            <h2>Order Summary</h2>
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
                    <td>Rp. {{ this.$store.state.total.toLocaleString('ID') }}</td>
                </tr>
            </tbody>
        </table>
        </div>
      </div>
      <div class="col-6">
        <div class="address">
            <h2> Input Your Address </h2>
            <form id="form-signUp" action="" method="POST">
                <label for="fname">Name:</label><br>
                <input type="text" id="Name" name="name" value="" v-model="name" required><br>
                <label for="fname">Country:</label><br>
                <input type="text" name="country" value="" v-model="country" required><br>
                <label for="lname">Full Address:</label><br>
                <input type="text" name="address" value="" v-model="address" required><br>
                <label for="lname">Zip Code:</label><br>
                <input type="text" name="zipcode" value="" v-model="zipcode" required><br>
                <label for="lname">Phone Number:</label><br>
                <input type="text" name="phone" value="" v-model="phone" required><br><br>
                <input type="submit" class="btn btn-warning" value="Confirm Order"
                v-on:click.prevent="add">
            </form>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
</div>
</template>
<script>
import axios from 'axios';
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../components/footer.vue';

export default {
  name: 'Checkout',
  components: {
    UserNavbar,
    Footer,
  },
  data() {
    return {
      baseUrl: 'https://pure-plains-87911.herokuapp.com',
      name: '',
      country: '',
      address: '',
      zipcode: '',
      phone: '',
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
    add() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/address`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: this.name,
          country: this.country,
          address: this.address,
          zipcode: this.zipcode,
          phone: this.phone,
        },
      })
        .then((data) => {
          console.log(data);
          this.$router.push({ name: 'Confirm' });
        })
        .catch((err) => {
          console.log(err.err);
          this.alert = true;
          this.msg = 'Field Cannot be empty!';
        });
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);
.table {
  width: 100%;
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
.address {
  color: black;
  width: 80%;
  text-align: center;
  font-family: 'Lato';
  font-weight: 300;
  margin : 40px auto;
  padding: 15px;
}
</style>
