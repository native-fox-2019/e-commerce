<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
    <router-link :to="{ name: 'main' }" class="navbar-brand">E-Commerce</router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" @click="$bvModal.show('addForm')" v-if="$store.state.role === 'admin'">
        <a href="#" class="nav-link">Add Product</a>
      </li>
      <li class="nav-item" v-if="$store.state.role === 'user'">
        <a
          href="#"
          class="nav-link"
          @click="$bvModal.show('addWallet')"
        >Wallet: {{$store.state.wallet}}</a>
      </li>
    </ul>

    <div>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="$store.state.role === 'user'">
          <b-dropdown variant="secondary">
            <template v-slot:button-content>Shopping Cart</template>
            <b-dropdown-item-button
              v-if="$store.state.checkout.length > 0" @click="checkout"
            >Checkout: {{$store.state.total}}</b-dropdown-item-button>
            <h6 v-if="$store.state.checkout.length === 0" class="cart">Empty</h6>
            <b-dropdown-divider v-if="$store.state.checkout.length > 0" />
            <cart-item v-for="data in $store.state.checkout" :key="data.id" :data="data" />
          </b-dropdown>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `register`">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `login`">
          <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="$store.state.navbar === `main`">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
    <b-modal id="addForm" hide-footer title="Add Product">
      <b-form @submit="onSubmit">
        <b-form-group label="Product Title:">
          <b-form-input v-model="form.name" type="text" required
          placeholder="Input Title here"></b-form-input>
        </b-form-group>

        <b-form-group label="Image URL:">
          <b-form-input v-model="form.image_url" type="url" required
          placeholder="Image URL here"></b-form-input>
        </b-form-group>

        <b-form-group label="Price:">
          <b-form-input v-model="form.price" type="number" required
          placeholder="Enter Price"></b-form-input>
        </b-form-group>

        <b-form-group label="Stock:">
          <b-form-input v-model="form.stock" type="number" required
          placeholder="Enter Stock"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-modal>
    <b-modal id="addWallet" hide-footer title="Add money to your wallet">
      <b-form @submit="add2Wallet">
        <b-form-group label="Total Wallet:">{{totalWallet}}</b-form-group>

        <b-form-group label="Amount to Add:">
          <b-form-input
            v-model="addAmount"
            type="number"
            min="1"
            required
            placeholder="Amount to add"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-modal>
  </nav>
</template>

<script>
import axios from 'axios';
import cartItem from './cartItem.vue';

export default {
  name: 'navbar',
  data() {
    return {
      form: {
        name: '',
        image_url: '',
        price: 1,
        stock: 1,
      },
      addAmount: 1,
    };
  },
  components: {
    cartItem,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios({
        url: '/products',
        baseURL: this.$store.state.url,
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: this.form,
      })
        .then(({ data }) => {
          this.form.name = '';
          this.form.image_url = '';
          this.form.price = 1;
          this.form.stock = 1;
          this.$bvModal.hide('addForm');
          this.$store.state.list.push(data);
        })
        .catch((err) => {
          this.$store.dispatch('toast', {
            vm: this,
            message: err.response.data.status_message.join(', '),
          });
        });
    },

    add2Wallet(event) {
      event.preventDefault();

      axios({
        url: '/users/add2wallet',
        baseURL: this.$store.state.url,
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: {
          wallet: this.addAmount,
        },
      })
        .then(() => {
          this.$store.state.wallet = this.totalWallet;
          this.$bvModal.hide('addWallet');
          this.addAmount = 1;
        })
        .catch((err) => {
          this.$store.dispatch('toast', {
            vm: this,
            message: err.response.data.status_message.join(', '),
          });
        });
    },

    checkout(event) {
      event.preventDefault();

      if (this.$store.state.total > this.$store.state.wallet) {
        this.$store.dispatch('toast', {
          vm: this,
          message: "You don't have money in your wallet",
        });
      } else {
        const promises = [];
        const failData = [];
        const newList = [];

        this.$store.state.checkout.forEach((i) => {
          promises.push(
            axios({
              url: `/carts/${i.id}`,
              baseURL: this.$store.state.url,
              method: 'post',
              headers: {
                token: localStorage.token,
              },
              data: {
                qty: i.qty,
                ProductId: i.ProductId,
                UserId: i.UserId,
                cost: i.qty * i.Product.price,
              },
            })
              .then(() => {
                this.$store.state.total -= i.qty * i.Product.price;
                this.$store.state.wallet -= i.qty * i.Product.price;

                this.$store.state.list.forEach((l) => {
                  const updatedProduct = l;
                  if (l.id === i.ProductId) {
                    updatedProduct.stock -= i.qty;
                  }

                  newList.push(updatedProduct);
                });
              })
              .catch((err) => {
                failData.push(i);

                this.$store.dispatch('toast', {
                  vm: this,
                  message: err.response.data.status_message.join(', '),
                });
              }),
          );
        });

        Promise.all(promises).then(() => {
          this.$store.state.checkout = failData;
          this.$store.state.list = newList;
        })
          .catch((err) => {
            this.$store.dispatch('toast', {
              vm: this,
              message: err.response.data.status_message.join(', '),
            });
          });
      }
    },
  },
  computed: {
    totalWallet() {
      return this.$store.state.wallet + Number(this.addAmount);
    },
  },
};
</script>
<style scoped>
.cart {
  padding: 1em;
  min-height: 50px;
  width: fit-content;
  justify-items: center;
  align-items: center;
  display: flex;
}
</style>
