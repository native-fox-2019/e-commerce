<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("toIsLoginTrue");
    } else {
      this.$router
        .push({
          path: "/"
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
body {
  padding: 0 5em;
  color: #707070;
  font-family: "Roboto", sans-serif;
}
</style>
