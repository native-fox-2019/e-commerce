<template>
  <div id="boxDetail">
    <!-- <h1 v-if="isLoading">loading ....</h1>
    <h1 v-if="!isLoading">{{dataProduct.name}}</h1>-->
    <div class="imageDetail">
      <img :src="dataProduct.image_url" alt style="width:100%;height:100%;object-fit:cover;" />
    </div>
    <div class="detailProduct">
      <h4>{{dataProduct.name}}</h4>
      <div id="hargaNstock">
        <p>price : {{dataProduct.price}}</p>
        <p>Stock : {{dataProduct.stock}}</p>
        <p>Fullfilled by : WearIsysm</p>
      </div>
      <div id="btnAddCart" @click="toCart">ADD TO CART</div>
      <div id="garis"></div>
      <div id="hargaNstock">
        <h5>Product detail :</h5>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore eaque ex molestiae, repudiandae voluptas, e</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailProduct",
  // product: this.dataProduct,
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    dataProduct() {
      let temp = this.$store.state.oneDataProduct;
      if (temp) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
      return temp;
    }
  },
  mounted() {
    const { id } = this.$route.params;
    this.$store.dispatch("getOneProduct", id);
  },
  methods: {
    toCart() {
      this.$router.push({
        path: "/cart"
      });
    }
  }
};
</script>

<style scoped>
#boxDetail {
  display: flex;
  justify-content: space-between;
}
.imageDetail {
  width: 50%;
  height: 400px;
  display: flex;
}
.detailProduct {
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 1em 0px;
}
#hargaNstock {
  margin-top: 2em;
  font-size: 15px;
}
#hargaNstock p {
  margin-bottom: 3px;
}
#btnAddCart {
  cursor: pointer;
  margin-top: 0.5em;
  border: 1px solid #707070;
  padding: 0.1em;
  display: flex;
  justify-content: center;
  width: 60%;
}
#btnAddCart:hover {
  background-color: #707070;
  color: #fff;
}
#garis {
  width: 100%;
  border-bottom: 1px solid #707070;
  margin-top: 1em;
}
</style>