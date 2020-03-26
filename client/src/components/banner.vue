<template>
  <div class="row text-left" >
    <div class="col-4" v-for="banner in banners" :key="banner.id">
      <div class="card mb-2">
        <img :src="banner.url" :alt="banner.name" style="width:100%; height:150px;" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const HEROKU_URL = 'https://peaceful-thicket-02203.herokuapp.com'
// const DEV_URL = "http://localhost:3000";
export default {
    data() {
        return {
          banners: []
        }
    },
    created(){
      this.getBanner()
    },
    methods: {
      async getBanner(){
        try {
          const banner = await axios({
          method:'GET',
          url: `${HEROKU_URL}/products/banner`
        })
          this.banners = banner.data.banners
        } catch (response) {
          console.log(response.response)
        }
        
      }
    }
};
</script>

<style></style>
