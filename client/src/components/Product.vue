<template>
<div>
    <div class="view d-flex row justify-content-center"
      v-if="view">
          <div
          class="card col-2 ml-3 mb-3"
          style="width: 18rem;"
          v-for="data in this.$store.state.userProduct"
          :key="data.id"
          >
              <img class="card-img-top" :src="data.image_url" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">{{ data.name }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Price : Rp.{{ data.price.toLocaleString('ID') }}</li>
              </ul>
              <div class="card-body d-flex justify-content-center row">
                  <input type="button" class="btn btn-warning ml-3"
                  v-on:click.prevent="deleteProduct(data.id)" value="Add To Cart">
              </div>
          </div>
      </div>
      <EditProduct :elementEdit="elementEdit" v-if="editBox"></EditProduct>
  </div>
</template>
<script>

export default {
  name: 'Product',
  components: {
  },
  data() {
    return {
      elementEdit: '',
      editBox: false,
      view: true,
    };
  },
  created() {
    this.userProducts();
  },
  methods: {
    userProducts() {
      this.$store.dispatch('Products');
    },
    edit(id) {
      this.$store.state.productList.forEach((element) => {
        if (element.id === id) {
          this.elementEdit = element;
        }
      });
      this.editBox = true;
      this.view = false;
    },
  },
};
</script>
<style scoped>
.view {
    width: 100%;
    padding-top: 20px;
}

</style>
