<template>
  <div>
    <div id="cartBox">
      <!-- {{carts}} -->
      <div id="tableDetail">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody v-for="cart in carts" :key="cart.id">
            <tr>
              <td>
                <img
                  :src="cart.Product.image_url"
                  alt
                  style="width:100px;height:100px;object-fit:cover"
                />
              </td>
              <td>{{cart.qty}}</td>
              <td>{{idr(cart.Product.price)}}</td>
              <td>{{idr(jumlahHarga(cart.qty,cart.Product.price))}}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="kuranginQty(cart.id, -1,cart.qty)"
                  >-</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="kuranginQty(cart.id, 1,cart.qty)"
                  >+</button>
                  <button type="button" class="btn btn-secondary" @click="deleteCart(cart.id)">x</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="totalSummary">
        <div class="summaryCol">
          <h6>ADD VOUCHER</h6>
          <form id="inputVoucher">
            <input type="text" />
            <button id="btnAdd">ADD</button>
          </form>
        </div>
        <div id="summaryGrand">
          <h6>SUMMARY</h6>
          <div class="totalSum">
            <p>Total :</p>
            <p>{{idr(totalPembayaran)}}</p>
          </div>
          <div class="totalSum">
            <p>Grand Total :</p>
            <p>{{idr(totalPembayaran)}}</p>
          </div>
          <div id="btnCheckOut" @click="checkout">CHECKOUT</div>
        </div>
      </div>
    </div>
    <div id="bank">
      <img src="@/assets/payment_footer.png" alt style="width:100%;object-fit:cover" />
    </div>
  </div>
</template>


<script>
import rupiah from "../helper/idr";
import axios from "axios";
import Swal from "sweetalert2";
const server = "http://localhost:3000";
// const server = "https://shrouded-mesa-95537.herokuapp.com/";

export default {
  name: "Cart",
  data() {
    return {
      carts: [],
      totalPembayaran: 0
    };
  },
  mounted() {
    this.getAllCart();
  },
  watch: {
    carts() {
      this.totalPembayaran = 0;
      this.carts.forEach(cart => {
        this.totalPembayaran += cart.qty * cart.Product.price;
      });
    }
  },
  methods: {
    idr(value) {
      return rupiah(value);
    },
    getAllCart() {
      axios({
        method: "get",
        url: `${server}/cart`,
        headers: { token: localStorage.token }
      })
        .then(result => {
          this.carts = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumlahHarga(paramQty, paramsPrice) {
      let total = Number(paramQty) * Number(paramsPrice);

      return total;
    },
    kuranginQty(id, value, currentNum) {
      let numNow = Number(value) + Number(currentNum);
      if (numNow < 1) {
        this.getAllCart();
      } else {
        axios({
          method: "patch",
          url: `${server}/cart/${id}`,
          headers: { token: localStorage.token },
          data: {
            value
          }
        })
          .then(result => {
            this.getAllCart();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    deleteCart(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#000",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("sudah di hapus");
          axios({
            method: "delete",
            url: `${server}/cart/${id}`,
            headers: { token: localStorage.token }
          })
            .then(result => {
              this.getAllCart();
              this.$store.dispatch("allCart");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    checkout() {
      Swal.fire({
        title: "Periksa kembali!",
        text: "Pastikan barang yang anda beli suda sesuai",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#000",
        confirmButtonText: "beli sekarang"
      }).then(result => {
        if (result.value) {
          Swal.fire("Terimakasih!");
          axios({
            method: "patch",
            url: `${server}/cart/checkout`,
            headers: { token: localStorage.token }
          })
            .then(result => {
              this.getAllCart();
              this.$store.dispatch("allCart");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
#cartBox {
  display: flex;
  padding-top: 2em;
}
#tableDetail {
  width: 65%;
}
table {
  color: #707070;
}
th {
  font-size: 15px;
  letter-spacing: 1px;
}
#totalSummary {
  width: 35%;
  display: flex;
  flex-direction: column;
}
.summaryCol {
  border: 1px solid #707070;
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100px; */
  padding-top: 1em;
  padding-bottom: 1em;
}
.summaryCol h6 {
  letter-spacing: 3px;
}
#inputVoucher {
  margin-top: 2px;
  display: flex;
  justify-content: center;
}
#btnAdd {
  background-color: #707070;
  color: #fff;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: center;
}
#btnAdd:hover {
  /* border: 1px solid #707070; */
  background-color: #fff;
  color: #707070;
}
input {
  outline: none;
  color: #707070;
}

#summaryGrand {
  display: flex;
  flex-direction: column;
  border: 1px solid #707070;
  margin-top: 1em;
  justify-content: center;
  align-items: center;
  padding-top: 1em;
}
.totalSum {
  border-bottom: 1px solid #707070;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px 1em;
  margin-bottom: 1em;
}
.totalSum p {
  font-size: 15px;
}
#btnCheckOut {
  width: 100%;
  background-color: #707070;
  color: #fff;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 35px;
  cursor: pointer;
}
#btnCheckOut:hover {
  border-top: 1px solid #707070;
  background-color: #fff;
  color: #707070;
}
#bank {
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>