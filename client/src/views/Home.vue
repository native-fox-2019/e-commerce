<template>
  <div class="home">
    <Carousel />
  <v-alert v-if="success" type="success">
    {{successMsg}}
  </v-alert>
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/card.vue";
import Carousel from "@/components/carousel.vue";

export default {
  name: "Home",
  components: {
    Card,
    Carousel
  },
  data() {
    return {
      successMsg: "Checkout Success!!"
    }
  },
  computed: {
    success(){
      return this.$store.state.successCheckout
    }
  },
  watch: {
    success() {
      setInterval(function() {
        this.$store.commit('setFalseAlert')
      }, 5000)
    }
  }
};
</script>
