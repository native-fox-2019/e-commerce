<template>
  <div id="home">
    <Navbar />
    <Carousel />
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col align="center"
            xs="4" lg="3" v-for="product in this.$store.state.products"
            :key="product.id">
            <Card :name="product.name" :category="product.category"
                :price="product.price" :stock="product.stock"
                :updatedAt="product.updatedAt.substring(0, 10).split('-').reverse().join('-')"
                :id="product.id"
                :image_url="product.image_url" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Carousel from '@/components/Carousel.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    Card,
  },
  created() {
    this.$store.dispatch('getProducts');
    this.$store.commit('checkLogin');
  },
};
</script>
