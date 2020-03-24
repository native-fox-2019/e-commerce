<template>
  <div class="page card d-flex flex-column justify-content-between"
  @click="$bvModal.show(formName)">
    <div class="d-flex flex-column">
      <h3>{{title}}</h3>
      <img :src="data.image_url" alt="error retrieving image" />
    </div>
    <div class="mt-3">
      <p class="float-left">Price: {{data.price}}</p>
      <p class="float-right">{{data.stock}} in stock</p>
    </div>
    <b-modal :id="formName" hide-footer
    :title="form.name">
      <b-form @submit="onSubmit">
          <b-form-group label="Cost:">
              {{cost}}
          </b-form-group>

      <b-form-group label="Quantity:">
        <b-form-input
          v-model="qty"
          type="number"
          required
          placeholder="Enter Quantity"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Add to Shopping Cart</b-button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  props: ['data'],
  data() {
    return {
      form: {
        name: this.data.name,
        image_url: this.data.image_url,
        price: this.data.price,
        stock: this.data.stock,
      },
      formName: `editForm${this.data.id}`,
      qty: 1,
    };
  },
  computed: {
    title() {
      if (this.data.name.length > 14) {
        return `${this.data.name.slice(0, 14)}...`;
      }
      return this.data.name;
    },
    cost() {
      return this.qty * this.form.price;
    },
  },
  methods: {

  },
};
</script>

<style scoped>
.page {
  padding: 1em;
  width: 100%;
  height: 100%;
}

.page:hover, .page:focus {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 0.3em 0 black;
  outline: none;
}

img {
  height: 13vw;
  align-self: center;
}
</style>
