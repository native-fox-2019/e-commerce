<template>
  <div>
    <BigSlide />

    <div id="boxProduct">
      <CardProduct
        v-for="listProduct in listProducts"
        :key="listProduct.id"
        :listProduct="listProduct"
      />
    </div>
    <NewsLetter />
  </div>
</template>

<script>
import CardProduct from "./CardProduct";
import NewsLetter from "./Newsletter";
import BigSlide from "./BigSlide";

export default {
  name: "ListProduct",
  components: {
    CardProduct,
    NewsLetter,
    BigSlide
  },
  computed: {
    listProducts() {
      let arr = this.$store.state.dataProducts;
      let temp = [];
      arr.forEach(item => {
        if (item.CategoryId !== 5) {
          temp.push(item);
        }
      });
      return temp;
    }
  },
  created() {
    this.$store.dispatch("getAll");
  }
  // mounted() {
  //   console.log(this.$store.dispatch("getAll"));
  // }
};
</script>

<style scoped>
#boxProduct {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2em;
  justify-content: space-between;
}
</style>