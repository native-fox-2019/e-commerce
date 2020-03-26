<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="this.data.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="this.data.name">
            <b-card-text>Price : Rp {{ this.data.price.toLocaleString() }}</b-card-text>
            <div>
              <b-form-spinbutton
                id="sb-inline"
                type="submit"
                v-model="amount"
                inline
              >{{this.data.amount}}</b-form-spinbutton>
            </div>
            <b-card-text>Total : Rp {{ this.total.toLocaleString() }}</b-card-text>
            <b-button pill variant="danger" @click.prevent="deleteCart">Delete</b-button>
            <b-button pill variant="warning" @click.prevent="submitAmount">Submit</b-button>
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
  props: ["data"],
  data() {
    return {
      id:this.data.id,
      amount:this.data.amount,
      total:this.data.price,
      price: this.data.price,
      productsId: this.data.productsId
    };
  },
  methods: {
    AddCart() {
      axios({
        method: "post",
        url: `http://localhost:3000/carts`,
        data: {
          productsId: this.id,
          amount: this.amount,
          name: this.name,
        },
        headers: {
          token:
            localStorage.getItem("token")
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

    submitAmount() {
      axios({
        method: "PUT",
        url: `http://localhost:3000/carts/${this.id}`,
        headers: {
          token:
            localStorage.getItem("token")

        },
        data: {
          amount: this.amount,
          id: this.id
        }
      }).then(response => {
        this.$store.dispatch("updateAmountCart", response.data);
      });
    },

    deleteActionCart() {
      axios({
        method: "delete",
        url: `http://localhost:3000/carts/${this.id}`,
        headers: {
          token:
            localStorage.getItem("token")
        }
      }).then(() => {
        this.$store.dispatch("deleteDataCart", this.id);
      });
    }
  },
  created() {
    this.total = this.amount * this.price;
  },
  watch: {
    amount: function (val) {
      this.total = val * this.price
    }
  },
};
</script>