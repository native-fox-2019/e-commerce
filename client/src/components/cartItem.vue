<template>
  <b-dropdown-item-button class="card" @click="$bvModal.show(formName)">
    <h6>{{title}}</h6>
    <p class="p">qty: {{data.qty}}</p>
    <p class="p">Cost: {{cost}}</p>

    <b-modal :id="formName" hide-footer :title="product.name">
      <b-form @submit="onSubmit">
        <b-form-group label="Cost:">{{ cost }}</b-form-group>

        <b-form-group label="Quantity:">
          <b-form-input
            v-model="data.qty"
            type="range"
            min="1"
            :max="data.stock"
            required
            placeholder="Enter Quantity"
          />
          <b-form-input
            v-model="data.qty"
            type="number"
            min="1"
            :max="data.stock"
            required
            placeholder="Enter Quantity"
          />
        </b-form-group>

        <b-button type="submit" variant="primary">Edit</b-button>
        <b-button type="button" variant="secondary" @click="onDelete"
        class="float-right">Delete</b-button>
      </b-form>
    </b-modal>
  </b-dropdown-item-button>
</template>
<script>
import axios from 'axios';

export default {
  props: ['data'],
  data() {
    return {
      product: {},
      amount2Total: 0,
      formName: `editForm${this.data.id}`,
    };
  },
  computed: {
    title() {
      if (this.product.name.length > 25) {
        return `${this.product.name.slice(0, 25)}...`;
      }
      return this.product.name;
    },

    cost() {
      return this.data.qty * this.product.price;
    },
  },
  created() {
    this.$store.state.list.forEach((i) => {
      if (i.id === this.data.ProductId) {
        this.product = i;
        this.$store.state.total += this.cost;
        this.amount2Total = this.cost;
      }
    });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      axios({
        url: `/carts/${this.data.id}`,
        baseURL: this.$store.state.url,
        method: 'put',
        headers: {
          token: localStorage.token,
        },
        data: {
          qty: this.data.qty,
          ProductId: this.product.id,
        },
      })
        .then(() => {
          this.$store.state.total += this.cost - this.amount2Total;
          this.amount2Total = this.cost;
          this.$bvModal.hide(this.formName);
        })
        .catch((err) => {
          this.$store.dispatch('toast', {
            vm: this,
            message: err.response.data.status_message.join(', '),
          });
        });
    },

    onDelete() {
      axios({
        url: `/carts/${this.data.id}`,
        baseURL: this.$store.state.url,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          const newCheckout = [];

          this.$store.state.checkout.forEach((i) => {
            if (i.id !== this.data.id) {
              newCheckout.push(i);
            }
          });

          this.$store.state.checkout = newCheckout;
          this.$store.state.total -= this.amount2Total;
          this.$bvModal.hide(this.formName);
        })
        .catch((err) => {
          this.$store.dispatch('toast', {
            vm: this,
            message: err.response.data.status_message.join(', '),
          });
        });
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
</style>
