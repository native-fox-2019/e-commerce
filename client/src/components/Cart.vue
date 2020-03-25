<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
      <b-form-checkbox v-model="id" value="this.PropProduct">Check that out</b-form-checkbox>
        <b-col md="6">
          <b-card-img :src="this.PropProduct.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="this.PropProduct.name">
            <b-card-text>Price : {{ this.PropProduct.price.toLocaleString() }}</b-card-text>
            <div>
              <label for="sb-inline">Inline spin button</label>
              <b-form-spinbutton id="sb-inline" type="submit" v-model="amount" inline></b-form-spinbutton>
            </div>
            <b-card-text>Total : Rp {{ (this.total).toLocaleString() }}</b-card-text>
            <b-button pill variant="primary" @click.prevent="deleteCart">Delete</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["PropProduct"],
  data() {
    return {
      items: [],
      id:this.PropProduct.id,
      amount:this.PropProduct.amount,
      total:this.PropProduct.price,
      price: this.PropProduct.price,
    };
  },
  methods: {
    AddCart() {
      axios({
        method: "post",
        url: `http://localhost:3000/cart`,
        data: {
          productsId: this.id,
          amount: this.amount,
          name: this.name,
        },
        headers: {
          token:
            localStorage.getItem("tokenAdmin") ||
            localStorage.getItem("tokenCustomer")
        }
      }).then(response => {
        this.$store.dispatch("holdCartItem", response.data);
      });
    },
    deleteCart() {
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
          this.deleteActionCart();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },

    deleteActionCart() {
      axios({
        method: "delete",
        url: `http://localhost:3000/cart/${this.id}`,
        headers: {
          token:
            localStorage.getItem("tokenAdmin") ||
            localStorage.getItem("tokenCustomer")
        }
      }).then(() => {
        this.$store.dispatch("deleteDataCart", this.id);
      });
    }
  },
  watch: {
    amount: function (val) {
      this.total = val * this.price
      this.AddCart()
    }
  },
};
</script>