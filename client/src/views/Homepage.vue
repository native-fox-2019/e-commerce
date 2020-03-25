<template>
  <div>
    <div class="container" style="margin-top:100px;">
      <h1 style="font-family:monospace; font-size:50px;">
        Welcome to Warungpedia.com
      </h1>
      <div class="row mt-5 text-left">
        <div class="col-12">
          <div class="container">
            <h2>We are here serving you with the most updated products</h2>
          </div>
        </div>
        <div class="col-12">
          <div class="container">
            <h4>Benefit in using warungpedia.com</h4>
            <ul>
              <li>100% Original</li>
              <li>Free Shipping*</li>
              <li>100% Moneyback Guaranteed</li>
            </ul>
            <small style="color:red;">*terms and condition applies</small>
          </div>
        </div>
      </div>
      <button class="btn btn-outline-success btn-block mt-5" @click.prevent="goTo('Products')">Click here to browse our products</button>
      <h2 class="mt-4" style="font-family:Helvetica;">Promos</h2>
        <banner></banner>
    </div>
  </div>
</template>

<script>
import banner from '../components/banner.vue'
export default {
    created() {
    },
    components: {
        banner
    },
    methods: {
      goTo(route) {
        this.$router.push({ name:route })
    }
    }
};
</script>

<style></style>
