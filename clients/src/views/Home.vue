<template>
  <div>
    <Navbar></Navbar>
    <b-container fluid class="mt-3">
      <!-- Content here -->
      <Carousel></Carousel>
      <b-container fluid class="mt-3 mb-3">
        <h5 style="color:#39387a;">
          <strong>Promo Hari Ini</strong>
        </h5>
        <b-row>
          <Promo v-for="item in promo" :key="item.id" :item="item" class="col-2"></Promo>
        </b-row>
      </b-container>
      <b-container fluid class="mt-3">
        <h5 style="color:#39387a;" class="pt-3">
          <strong>Products</strong>
        </h5>
        <b-row>
          <Cards v-for="item in products" :key="item.id" :item="item" class="col-2 mb-3"></Cards>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Promo from "../components/Promo";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    Carousel,
    Cards,
    Promo
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["promo"])
  },
  created() {
    this.$store.dispatch("fetch");
  }
};
</script>