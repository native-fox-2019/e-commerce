<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <router-link to="/">
        <b-navbar-brand left>
            <img src="../assets/logo.png" alt="Xen Store" srcset="" width="30px">
            Xen Store
        </b-navbar-brand>
      </router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->
        <b-nav-item right v-if="!isLogin" @click="login()">
          <em>Login</em>
        </b-nav-item>
        <div right class="row" v-else>
          <div class="d-flex align-items-center">
            <router-link to="/cart" class="col">
              <img src="../assets/cart-arrow-down-solid.png" style="width: 30px" class="mx-2">
              <span class="text-white">{{cartTotal}}</span>
            </router-link>
          </div>
          <b-nav-item-dropdown style="margin-right: 50px">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{name}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    login(){
      this.$router.push("/login")
    },
    logout(){
      localStorage.clear()
      this.$store.commit("logout")
    }
  },
  computed: {
    isLogin: function(){
      return this.$store.state.isLogin
    },
    name: function(){
      return this.$store.state.name
    },
    cartTotal: function(){
      return this.$store.state.cartTotal
    }
  },
  created(){
    this.$store.commit("login")
    this.$store.dispatch("getCart")
  },
  mounted(){
    console.log(this.$store.state.cartTotal)
  }
}
</script>

<style>

</style>