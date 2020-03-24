<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <Loading v-if="loading" />
        <tr v-for="product in products" :key="product.id">
          <td> {{ product.name }} </td>
          <td> <img class="img-fluid" :src="product.image_url" :alt="product.name"> </td>
          <td> {{ product.price }} </td>
          <td> {{ product.stock }} </td>
          <td>
            <button class="btn btn-primary mx-1" @click.prevent="editDataForm(product.id)">
              Edit
            </button>
            <button class="btn btn-danger mx-1" @click.prevent="deleteData(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './Loading.vue';
export default {
  components: {
    Loading
  },
  created() {
    this.getProducts();
  },
  computed: mapState(['loading', 'products']),
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    deleteData(id) {
      this.$store.dispatch('deleteDataConfirmation', id);
    },
    editDataForm(id) {
      this.$store.dispatch('editDataForm', id);
    }
  }
}
</script>