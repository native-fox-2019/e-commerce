<template>
  <v-carousel
    cycle
    :interval="4000"
    height="400"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    :show-arrows="false"
  >
    <v-carousel-item v-for="(slide, i) in carousel" :key="i" :src="slide.image"></v-carousel-item>
  </v-carousel>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["carousel"])
  },
  created() {
    this.$store.dispatch("fetchCampaigns");
  }
};
</script>