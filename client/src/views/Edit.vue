<template>
  <!--Naked Form-->
  <div class="container mt-3" style="width: 50%">
    <div class="card-block">
      <!--Header-->
      <div class="text-center">
        <h3>
          <i class="far fa-edit mr-2"></i>Edit Data
        </h3>
        <hr class="mt-2 mb-2" />
      </div>

      <!--Body-->
      <div class="md-form text-left">
          <label for="">Name</label>
        <input type="text" id="form3" class="form-control" v-model="editProduct.name" />
      </div>
        
      <div class="md-form text-left mt-4">
             <label for="">Category</label>
        <input type="text" id="form2" class="form-control" v-model="editProduct.category" />
      </div>

      <div class="md-form text-left mt-4">
             <label for="">Decription</label>
        <input type="text" id="form32" class="form-control" v-model="editProduct.description" />
      </div>

      <div class="md-form text-left mt-4">
             <label for="">Price</label>
        <input type="text" id="form32" class="form-control" v-model="editProduct.price" />
      </div>

      <div class="md-form text-left mt-4">
             <label for="">Stock</label>
        <input type="text" id="form32" class="form-control" v-model="editProduct.stock" />
      </div>

      <div class="md-form text-left mt-4">
             <label for="">Image Url</label>
        <input type="text" id="form32" class="form-control" v-model="editProduct.image_url" />
      </div>

      <div class="text-center">
        <button class="btn btn-danger mt-2" @click="cencelEdit">Cencel</button>
      </div>
      <div class="text-center mt-2">
        <button class="btn btn-primary" @click="editData(editProduct)">Submit</button>
      </div>
    </div>
  </div>
  <!--Naked Form-->
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Edit",
  data() {
    return {
      newEdit: {}
    };
  },
  computed: {
    editProduct() {
        console.log(this.$store.state.editData, 'ini di edit form')
      return this.$store.state.editData;
    }
  },

  methods: {
    editData(data) {
      this.$store.dispatch("editData", data);
      this.$router.push({ path: "/adminpage" });
    },
    cencelEdit() {
      this.$router.push({ path: "/adminpage" });
    }
  }
});
</script>

<style>
</style>