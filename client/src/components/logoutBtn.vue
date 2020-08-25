<template>
  <v-btn icon>
    <div @click="goHome" >
      <v-icon>mdi-logout</v-icon>
      <p>LogOut</p>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "logoutBtn",
  methods: {
    goHome(){
      localStorage.removeItem("token")
      this.$store.commit('deleteToken')
      this.$emit('logOut')
    }
  }

}
</script>

<style>

</style>