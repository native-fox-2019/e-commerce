
<template>
<div class="container row" style="margin-left: 3em; display: flex; justify-content: center flex-start; ">
  <v-card
  class="cards"
    :loading="loading"
    v-for="product in products" :key="product.id"
    width= 23%
    style="margin-left: 15px;"
  >
    <div justify=center align=center >
        <v-img
          width=300px
          height=300px
          :src="product.image_url"
        ></v-img>
        <v-card-title>{{product.name}}</v-card-title>
    </div>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>
      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>
      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>{{product.stock}}</v-card-title>
    <v-card-text>
      {{product.price}}
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click.prevent="detail(product.id)"
        color="deep-purple lighten-2"
        text
      >
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>
<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
  export default Vue.extend ({
    name : 'AllCategory',
    components : {
      Navbar,
      Footer
    },
    data: () => ({
      loading: false,
      selection: 1,
    }),
     computed : {
      products () {
        return this.$store.state.products.data
      }
    },
    created() {
      this.$store.dispatch('findAll')
    }
  })
</script>
<style scoped>
.cardsContainer {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}
.cards {
  margin-left: 20px;
  width: 20%;
  margin: 20px 0px 20px 0px;
  position: relative;
  transition: 320ms ease;
}
.cards:hover{
  transform: scale(1.08);
  margin: 20px;
  /* background-color: black; */
}
/* .cards:hover{
} */
</style>



