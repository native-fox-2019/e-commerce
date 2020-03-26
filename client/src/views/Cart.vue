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
          <td>
            <button
              class="btn btn-outline-danger"
              @click.prevent="deleteCart({id:cart.id, prod_id:cart.product_id, amount:cart.amount})"
            >
              Remove from cart
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="container-lg bg-dark text-white p-5" style="margin-top:100px; margin-bottom:190px;">
      <h3>{{ msg }}</h3>
      <div v-if="totalInt != 0">
        <h4 class="mt-3">Total order : {{ grandTotal }}</h4>
        <button
          class="btn btn-outline-warning mb-3 mt-2"
          @click.prevent="checkout"
        >
          checkout
        </button>
        <p style="font-family:monospace; font-size:20px;">Or</p>
      </div>
      <button class="btn btn-outline-light" @click.prevent="goTo('Products')">
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script>
import converter from "../helpers/currency.js";
export default {
  data() {
    return {
      grandTotal: "",
      totalInt: 0,
      msg: ""
    };
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal() {
      this.$store.state.cartList.forEach(i => {
        this.totalInt += i.total;
      });
      if (this.totalInt == 0) {
        this.msg = "Your cart is empty";
      } else {
        this.msg = "Please checkout to proceed with the order";
      }
      this.grandTotal = converter(this.totalInt);
    },
    checkout() {
      console.log("masuk checkout di cart");
      this.$store.dispatch("deleteAllCart");
      this.$router.push({ name: "Products" });
      this.$store.state.cartList = [];
    },
    goTo(route) {
      this.$router.push({ name: route });
    },
    deleteCart(payload) {
      this.$store.dispatch("deleteCart", payload);
      this.$store.state.cartList.forEach(i => {
        if (i.id == payload.id) {
          this.totalInt -= i.price * i.amount;
        }
      });
      if (this.totalInt == 0) {
        this.msg = "Your cart is empty";
      } else {
        this.msg = "Please checkout to proceed with the order";
      }
      this.grandTotal = converter(this.totalInt);
    }
  }
};
</script>

<style></style>
