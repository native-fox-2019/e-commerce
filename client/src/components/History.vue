<template>
  <div class="container" style="margin-top: 70px">
    <router-link to="/cart" class="m-2">
      <b-button variant="info">
        Back Cart
      </b-button>
    </router-link>
    <div>
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card v-for="product in row.item.products" :key="product.id">
              <b-row class="d-flex align-items-center">
                <b-col><img :src="product.image_url" alt="" srcset="" style="width: 100px"></b-col>
                <b-col>{{ product.name }}</b-col>
                <b-col>{{ formatPrice(product.price) }}</b-col>
                <b-col>Qty: {{ product.quantity }}</b-col>
              </b-row>

          </b-card>
            <!-- <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button> -->
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      fields: ['id', 'totalPrice', 'createdAt', 'show_details'],
      // items: [
      //   { isActive: false, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      // ]
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    moment: function () {
      return moment();
    }
  },
  computed: {
    items() {
      return this.$store.state.histories;
    },
  },
  created(){
    this.$store.dispatch('getHistory');
  }

}
</script>

<style scoped>
.card-body{
  padding: 0.1em !important;
}
</style>