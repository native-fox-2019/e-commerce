<template>
  <v-btn icon>
    <div @click="goHome" >
      <v-icon>mdi-home-circle</v-icon>
      <p>Home</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "homeBtn",
  methods: {
    goHome() {
      this.$router.push({name: "Home"})
      this.$emit("toCart")
    }
  }
}
</script>

<style>

</style>