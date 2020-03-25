<template>
  <div>
    <!-- loop here -->
    <div class="bigCard">
      <div id="headCard">{{listProduct.name}}</div>
      <div class="imageCard">
        <img :src="listProduct.image_url" alt style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="priceNicon">
        <div id="priceNstock">
          <p>Price : {{listProduct.price}}</p>
          <p>Stock :{{listProduct.stock}}</p>
        </div>
        <div id="iconDetailnAddCart">
          <div class="iconCard">
            <!-- <img src="@/assets/shopping-cart.svg" alt /> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-shopping-cart"
              id="cartIcon"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <div class="iconCard" @click="actionToDetail(listProduct.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-zoom-in"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- end card -->
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["listProduct"],
  methods: {
    actionToDetail(id) {
      // this.$store.dispatch("getOneProduct", id);
      this.$router.push({
        path: `/detail/${id}`
      });
    }
  }
};
</script>

<style  scoped>
.bigCard {
  border: 1px solid #707070;
  width: 250px;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
}
#headCard {
  width: 50%;
  border: 1px solid #707070;
  height: 50px;
  background-color: #707070;
  color: #fff;
  padding: 5px;
  font-weight: 100;
  margin-bottom: 1em;
}
.imageCard {
  width: 100%;
  height: 200px;
}
.priceNicon {
  /* border: 1px solid #707070; */
  /* height: 31%; */
  display: flex;
  justify-content: space-between;
}
#priceNstock {
  padding: 5px;
  font-size: 15px;
  height: 100%;
}
#iconDetailnAddCart {
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 80px;
}
.iconCard {
  background-color: #707070;
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  outline: none;
  align-items: center;
  border: none;
}
.iconCard:hover {
  background-color: #fff;
  border: 1px solid #707070;
  stroke: black;
}
.iconCard svg:hover {
  stroke: #707070;
  /* fill: #707070; */
}
p {
  margin-bottom: 3px;
}
</style>>
