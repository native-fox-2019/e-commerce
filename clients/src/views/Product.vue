<template>
  <v-app id="inspire">
    <Navbar></Navbar>
    <!-- {{oneProduct}} -->
    <b-container fluid class="d-flex mb-4" style="color:#39387a;">
      <img
        class="ml-5 mr-5"
        :src="one.image_url"
        alt
        style="border-radius:10px;box-shadow: 3px 3px 3px grey; width:500px;height:500px; margin-top:35px;"
      />
      <div class="container col">
        <H1 class="ml-5 mt-5">
          <strong>{{one.name}}</strong>
        </H1>
        <hr />
        <div class="container d-inline-flex">
          <h5 class="ml-5" style="color:black;">Harga</h5>
          <h2 class="ml-5">
            <strong>{{formatRupiah(one.price)}}</strong>
          </h2>
        </div>
        <hr />
        <div class="container d-inline-flex">
          <h5 class="ml-5" style="color:black;">Jumlah</h5>
          <div class="container ml-3">
            <v-text-field class="md-4 col-sm-4" v-model="qty">
              <v-icon
                slot="append"
                color="red"
                style="cursor:pointer;"
                @click.prevent="plus"
              >mdi-plus</v-icon>
              <v-icon
                v-if="qty>=1"
                slot="prepend"
                color="green"
                style="cursor:pointer;"
                @click.prevent="minus"
              >mdi-minus</v-icon>
            </v-text-field>
          </div>
        </div>
        <hr />
        <div class="container d-inline-flex">
          <h5 class="ml-5 mt-3" style="color:black;">Total</h5>
          <h2 class="ml-5 mt-3">
            <strong>{{formatRupiah(total)}}</strong>
          </h2>
        </div>
        <hr />
        <v-btn
          block
          style="background-color:#39387a;color:white;"
          @click.prevent="addCart"
        >Tambah Ke Keranjang</v-btn>
      </div>
    </b-container>
    <Footer></Footer>
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});
import { mapState } from "vuex";
import { axios, errorHandler } from "../config/axios";
export default {
  name: "Product",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      qty: 1,
      total: 0
    };
  },
  created() {
    this.$store.dispatch("fetchOne", this.$route.params.id);
  },
  computed: {
    one() {
      return this.$store.state.oneProduct;
    }
  },
  watch: {
    one() {
      this.total = this.one.price * this.qty;
    }
  },
  methods: {
    async addCart() {
      try {
        if (localStorage.access_token) {
          let input = {
            id: this.$route.params.id,
            total: this.total,
            qty: this.qty
          };
          let { data } = await axios.post("/cart", input, {
            headers: {
              access_token: localStorage.access_token
            }
          });
          this.$router.push({
            path: "/carts"
          });
        } else {
          Toast.fire({
            icon: "warning",
            title: "Please login first."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    formatRupiah(angka) {
      let reverse = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      let ribuan = reverse.match(/\d{1,3}/g);
      let rupiah = ribuan
        .join(".")
        .split("")
        .reverse()
        .join("");
      return "Rp. " + rupiah;
    },
    plus() {
      this.qty += 1;
      this.total += this.one.price;
    },
    minus() {
      this.qty -= 1;
      this.total -= this.one.price;
    }
  }
};
</script>