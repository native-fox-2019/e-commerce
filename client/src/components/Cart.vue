<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <b-col md="6">
          <b-card-img :src="this.PropProduct.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="this.PropProduct.name">
            <b-card-text>Price : Rp {{ this.PropProduct.price.toLocaleString() }}</b-card-text>
            <div>
              <b-form-spinbutton
                id="sb-inline"
                type="submit"
                v-model="amount"
                inline
              >{{this.PropProduct.amount}}</b-form-spinbutton>
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
  props: ["PropProduct"],
  data() {
    return {
      checked: false,
      id: this.PropProduct.id,
      amount: this.PropProduct.amount,
      total: this.PropProduct.price,
      price: this.PropProduct.price,
      productsId: this.PropProduct.productsId
    };
  },
  methods: {
    AddCart() {
      axios({
        method: "post",
        url: `https://murmuring-caverns-76029.herokuapp.com/cart`,
        data: {
          productsId: this.id,
          amount: this.amount,
          name: this.name
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
        url: `https://murmuring-caverns-76029.herokuapp.com/cart/${this.id}`,
        headers: {
          token:
            localStorage.getItem("tokenAdmin") ||
            localStorage.getItem("tokenCustomer")
        }
      }).then(() => {
        this.$store.dispatch("deleteDataCart", this.id);
      });
    },
    submitAmount() {
      axios({
        method: "PUT",
        url: `https://murmuring-caverns-76029.herokuapp.com/cart/` + this.id,
        headers: {
          token:
            localStorage.getItem("tokenAdmin") ||
            localStorage.getItem("tokenCustomer")
        },
        data: {
          amount: this.amount,
          id: this.id
        }
      }).then(response => {
        console.log(response.data);
        this.$store.dispatch("updateAmountCart", response.data);
      });
    }
    // checkItem(){
    //   if(true){
    //     this.$store.dispatch('plusItem')
    //   } else {
    //     this.$store.dispatch('minusItem')
    //   }
    // }
  },
  created() {
    this.total = this.amount * this.price;
  },
  watch: {
    amount: function(val) {
      this.total = val * this.price;
    },
    checked: function() {
      if (this.checked == true) {
        this.$store.dispatch("plusItem", {
          id: this.id,
          amount: this.amount,
          productsId: this.productsId
        });
      } else {
        this.$store.dispatch("minusItem", {
          id: this.id,
          amount: this.amount,
          productsId: this.productsId
        });
      }
    }
  }
};
</script>