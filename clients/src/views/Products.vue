<template>
  <div>
    <Navbar></Navbar>
    <b-container fluid class="mt-4 ml-3">
      <h5 style="color:#39387a;" class="ml-3">
        <strong>Semua Product Terlaris</strong>
      </h5>
    </b-container>
    <b-container fluid>
      <b-row class="mt-5">
        <Cards v-for="(item,i) in products" :key="i" :item="item" class="col-2"></Cards>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { mapState } from "vuex";
export default {
  name: "Products",
  components: {
    Navbar,
    Cards,
    Footer
  },
  computed: {
    ...mapState(["products"])
  },
  created() {
    this.$store.dispatch("fetch");
  }
};
</script>