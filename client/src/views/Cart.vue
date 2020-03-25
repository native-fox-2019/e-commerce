<template>
  <div class="container" style="margin-top:100px;">
    <table class="table text-left">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Amount</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody
        class="text-left"
        v-for="cart in this.$store.state.cartList"
        :key="cart.id"
      >
        <tr>
          <td>{{ cart.name }}</td>
          <td>{{ cart.amount }}</td>
          <td>{{ cart.showPrice }}</td>
        </tr>
      </tbody>
    </table>
    <div class="container-lg bg-dark text-white p-5" style="margin-top:200px;">
      <h3>Please checkout to proceed with the order</h3>
      <h4 class="mt-3">Total order : {{ grandTotal }}</h4>
      <button class="btn btn-outline-warning mb-3 mt-2" @click.prevent="checkout">checkout</button>
      <p style="font-family:monospace; font-size:20px;">Or</p>
      <button class="btn btn-outline-light" @click.prevent="goTo('Products')">Continue Shopping</button>
    </div>
  </div>
</template>

<script>
import converter from "../helpers/currency.js";
export default {
  data() {
    return {
      grandTotal: ""
    };
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal() {
      let totals = 0;
      this.$store.state.cartList.forEach(i => {
        totals += i.total;
      });
      this.grandTotal = converter(totals);
    },
    checkout() {
        this.$store.dispatch('deleteAllCart')
        this.$router.push({ name: "Products" });
        this.$store.state.cartList = []
    },
    goTo(route) {
      this.$router.push({ name: route })
    }
  }
};
</script>

<style></style>
