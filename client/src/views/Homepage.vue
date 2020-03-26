<template>
  <div>
    <div style="padding:100px;">
      <h1 style="font-family:monospace; font-size:50px;">
        Welcome to Warungpedia.com
      </h1>
      
      <button
        class="btn btn-outline-success btn-block mt-5"
        @click.prevent="goTo('Products')"
      >
        Click here to browse our products
      </button>
      <banner class="mt-5"></banner>
      <div class="row mt-5">
        <div class="col-6 text-center">
          <div>
            <img
              src="https://alabamahosting.net/wp-content/uploads/2014/07/why_us.png"
              alt=""
              style="width:500px; height:200px;"
            />
          </div>
        </div>
        <div class="col-6 mt-5">
          <div class="row">
            <div class="col-4">
              <img
                src="https://www.onlygfx.com/wp-content/uploads/2017/11/100-percent-original-stamp-3.png"
                alt=""
                style="width:150px; height:150px;"
              />
            </div>
            <div class="col-4">
              <img
                src="https://i.ya-webdesign.com/images/free-delivery-png-2.png"
                alt=""
                style="width:150px; height:150px;"
              />
            </div>
            <div class="col-4">
              <img
                src="https://www.stickpng.com/assets/images/5a0ad9c35a997e1c2cea1109.png"
                alt=""
                style="width:150px; height:150px;"
              />
            </div>
          </div>
          <small class="text-right text-danger"
            >*terms and condition applies</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "../components/banner.vue";
export default {
  created() {},
  components: {
    banner
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    }
  }
};
</script>

<style></style>
