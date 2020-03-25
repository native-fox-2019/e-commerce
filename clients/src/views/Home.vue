<template>
  <div>
    <Navbar></Navbar>
    <b-container fluid class="mt-2">
      <!-- Content here -->
      <Carousel></Carousel>
      <b-container fluid class="mt-3">
        <h5 style="color:#39387a;">
          <strong>Promo Hari Ini</strong>
        </h5>
        <b-row>
          <Promo v-for="item in promo" :key="item.id" :item="item" class="col-2"></Promo>
        </b-row>
      </b-container>

      <b-container fluid class="mt-2">
        <button
          class="css-e9kv9p ml-1"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#1"
          @click.prevent="changePage"
        >
          <div class="active css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">For {{name}}</div>
        </button>
        <button
          class="css-2ukpoy ml-3"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#2"
          @click.prevent="changePage"
        >
          <div class="css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">Gajian Ekstra</div>
        </button>
        <button
          class="css-9nmbev ml-2"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#3"
          @click.prevent="changePage"
        >
          <div class="css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">Special Discount</div>
        </button>
        <button
          class="css-42ob30 ml-1"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#4"
          @click.prevent="changePage"
        >
          <div class="css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">Aksesoris Jam Tangan Pria</div>
        </button>
        <button
          class="css-69lha7 ml-1"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#5"
          @click.prevent="changePage"
        >
          <div class="css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">iOS</div>
        </button>
        <button
          class="css-1wxch1a ml-1"
          type="button"
          role="tab"
          data-testid="btnHomeRecomTab#6"
          @click.prevent="changePage"
        >
          <div class="css-825sy5 e1ugnrpg0" data-testid="divMegaTabText">Kabel HDMI</div>
        </button>
        <hr />
        <div class="container col-12 d-flex">
          <h5 style="color:#39387a;" class="pt-3">
            <strong>Produk terlaris</strong>
          </h5>
          <h5
            style="color:#39387a; cursor:pointer;"
            @click.prevent="changePage"
            class="pt-3 ml-auto"
          >
            <strong>Lihat semuat produk</strong>
          </h5>
        </div>
        <b-row class="mt-5">
          <Cards v-for="(item,i) in homeProduct" :key="i" :item="item" class="col-2"></Cards>
        </b-row>
      </b-container>
    </b-container>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Promo from "../components/Promo";
import Footer from "../components/Footer";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Navbar,
    Carousel,
    Cards,
    Promo,
    Footer
  },
  data() {
    return {
      name: localStorage.fullname
    };
  },
  computed: {
    ...mapGetters(["promo"]),
    ...mapGetters(["homeProduct"])
  },
  created() {
    this.$store.dispatch("fetch");
  },
  methods: {
    changePage() {
      this.$router.push({
        path: "/products"
      });
    }
  }
};
</script>
<style scoped>
.css-1wxch1a {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2019/10/23/40768394/40768394_7c9ad641-8a48-4b63-a4cc-cae37bbcaae1.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
}
.css-69lha7 {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  margin-right: 10px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2019/11/7/75545163/75545163_f6ac6050-3872-48e8-b445-02a33e346061.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
}
.css-42ob30 {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  margin-right: 10px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2019/10/23/40768394/40768394_6a24460c-fbc2-40ab-bea6-3e557474f1d7.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
}
.css-9nmbev {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  margin-right: 10px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2019/10/8/40768394/40768394_1629133d-4c08-467c-aed0-bd8e82c7ea40.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
}
.css-2ukpoy {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  margin-right: 10px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2020/3/24/75545163/75545163_52644aa3-8fde-4ed6-92b9-3c83f4497079.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
}
.css-1t9xoid button {
  font-family: "open sans", "tahoma", sans-serif;
  cursor: pointer;
}
.css-825sy5 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 100%;
  height: 42px;
  text-align: left;
  font-size: 16px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: rgb(255, 255, 255);
  white-space: normal;
  overflow-wrap: break-word;
  overflow: hidden;
}

.css-e9kv9p {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 216px;
  height: 64px;
  margin-right: 10px;
  background-image: url(https://ecs7.tokopedia.net/img/cache/200/attachment/2019/10/8/40768394/40768394_8989ef25-ee3b-4510-89bb-fc894078954c.jpg);
  outline: 0px;
  padding: 6px 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 8px;
  background-repeat: round;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
</style>