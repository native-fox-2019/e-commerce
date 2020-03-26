<template>
  <div id="app">
    <Navbar></Navbar>
    <v-app id="inspire" class="d-inline-flex">
      <v-card
        class="ml-auto"
        color="#39387a"
        dark
        width="550"
        style="margin-bottom:-355px;margin-right:50px;margin-top:100px"
      >
        <v-card-title>
          <v-icon medium left>mdi-cart</v-icon>
          <span class="title font-weight-bold">Ringkasan Belanja</span>
        </v-card-title>

        <div class="row">
          <v-col cols="12" class="pb-5 px-6">
            <v-card color="white" dark>
              <v-card-title class="headline" style="color:#39387a;">Total Harga :</v-card-title>
              <h1 class="ml-5" style="color:#39387a;">{{formatRupiah(totalCart)}}</h1>
              <v-card-actions>
                <v-btn class="mx-auto" color="#39387a" block @click.prevent="checkout">Check Out</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </div>
      </v-card>
      <v-card width="600" class="ml-5 mt-5 mb-5">
        <v-app-bar style="color:white;" color="#39387a">
          <v-toolbar-title>Total Product</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-container>
          <v-row dense>
            <v-col v-for="(item, i) in one" :key="i" cols="12">
              <v-card light>
                <div class="d-flex flex-no-wrap">
                  <div>
                    <v-avatar class="ma-3" size="165" tile>
                      <v-img :src="item.Product.image_url"></v-img>
                    </v-avatar>
                  </div>
                  <div>
                    <v-card-text>
                      <h1 style="color:#39387a">{{item.Product.name}}</h1>
                      <hr />
                      <div class="row">
                        <div class="col" style="color:#39387a">
                          <h5>Total :</h5>
                          <p>{{formatRupiah(item.total)}}</p>
                        </div>

                        <v-text-field class="md-4 col-sm-4" v-model="item.qty">
                          <v-icon
                            slot="append"
                            color="red"
                            style="cursor:pointer;"
                            @click.prevent="plus(item)"
                          >mdi-plus</v-icon>
                          <v-icon
                            v-if="item.qty>=1"
                            slot="prepend"
                            color="green"
                            style="cursor:pointer;"
                            @click.prevent="minus(item)"
                          >mdi-minus</v-icon>
                        </v-text-field>
                      </div>
                    </v-card-text>
                  </div>
                  <div class="ml-auto mt-auto mr-1">
                    <v-btn icon @click.prevent="remove(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <Footer class="mt-auto"></Footer>
    </v-app>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { axios, errorHandler } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "Carts",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    one() {
      return this.$store.state.cart.sort((a, b) => a.id - b.id);
    },
    totalCart() {
      let total = 0;
      for (let i = 0; i < this.one.length; i++) {
        total += this.one[i].total;
      }
      return total;
    }
  },
  created() {
    this.$store.dispatch("fetchCart");
  },
  methods: {
    async checkout() {
      try {
        let result = await Swal.fire({
          title: "Sudah selesai berbelanja?",
          text: "Periksa kembali apakah barang yang dibeli sudah sesuai. ",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#39387a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Check Out",
          cancelButtonText: "Lanjut Belanja"
        });
        if (result.value) {
          let { data } = await axios.delete("/cart", {
            headers: {
              access_token: localStorage.access_token
            }
          });
          this.$store.dispatch("fetchCart");
          Swal.fire({
            title: "Thank you for your order",
            text:
              "We are currently proccessing your order and we will email you with the confirmation shortly.",
            icon: "success",
            showConfirmButton: false,
            timer: 4000,
            showClass: {
              popup: "animated fadeInDown faster"
            },
            hideClass: {
              popup: "animated fadeOutUp faster"
            }
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    async remove(item) {
      try {
        let result = await Swal.fire({
          title: "Hapus barang?",
          text: "Barang ini akan dihapus dari keranjangmu.",
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: "#39387a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Hapus Barang",
          cancelButtonText: "Kembali"
        });
        if (result.value) {
          let input = {
            qty: item.qty
          };
          let { data } = await axios.delete(`/cart/${item.Product.id}`, {
            headers: {
              access_token: localStorage.access_token
            }
          });
          this.$store.dispatch("fetchCart");
          Toast.fire({
            icon: "success",
            title: "Barang berhasil dihapus dari keranjang."
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
    async minus(item) {
      try {
        let input = {
          qty: Number(item.qty) - 1,
          total: Number(item.total) - Number(item.Product.price),
          ProductId: item.ProductId,
          parameter: "minus"
        };
        let { data } = await axios.put(`/cart/${item.id}`, input, {
          headers: {
            access_token: localStorage.access_token
          }
        });
        this.$store.dispatch("fetchCart");
      } catch (error) {
        errorHandler(error);
      }
    },
    async plus(item) {
      try {
        let input = {
          qty: Number(item.qty) + 1,
          total: Number(item.total) + Number(item.Product.price),
          ProductId: item.ProductId,
          parameter: "plus"
        };
        let { data } = await axios.put(`/cart/${item.id}`, input, {
          headers: {
            access_token: localStorage.access_token
          }
        });
        this.$store.dispatch("fetchCart");
      } catch (error) {
        errorHandler(error);
      }
    }
  }
};
</script>