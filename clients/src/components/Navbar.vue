<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      style="box-shadow: 3px 3px 3px grey;background-color:#39387a;"
    >
      <b-navbar-brand href="/" @click.prevent="home">
        <img src="../images/main.png" width="180px" style alt />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav>
        <b-nav-item href="/products" @click.prevent="products">Products</b-nav-item>
      </b-navbar-nav>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="/carts" @click.prevent="cart">
              <b-icon icon="bag"></b-icon>
            </b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right :text="name" v-if="name">
            <!-- Using 'button-content' slot -->
            <b-dropdown-item href="/signout" @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-navbar-nav v-else>
            <b-nav-item href="/login" @click.prevent="login">Login</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});
export default {
  name: "Navbar",
  data() {
    return {
      name: localStorage.fullname
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        path: "/login"
      });
      Toast.fire({
        icon: "success",
        title: "Sign out successfully , See you again !"
      });
    },
    cart() {
      if (!localStorage.access_token) {
        Toast.fire({
          icon: "warning",
          title: "Please login first."
        });
      } else {
        this.$router.push({
          path: "/carts"
        });
      }
    },
    login() {
      this.$router.push({
        path: "/login"
      });
    },
    home() {
      this.$router.push({
        path: "/"
      });
    },
    products() {
      this.$router.push({
        path: "/products"
      });
    }
  }
};
</script>


   
     