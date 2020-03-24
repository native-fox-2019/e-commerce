<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-dark">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="" class="nav-link text-white" @click.prevent="goTo('Home')"
            >Home</a
          >
        </li>
        <li class="nav-item">
          <a
            href=""
            class="nav-link text-white"
            @click.prevent="goTo('Products')"
            >Products</a
          >
        </li>
      </ul>
    </div>
    <div class="form-inline my-2 my-lg-0">
      <a
        href=""
        class="nav-link text-light"
        @click.prevent="goTo('Cart')"
        v-if="isLoggedin"
        >My Cart</a
      >
    </div>
    <div class="form-inline my-2 my-lg-0">
      <button
        class="btn btn-danger my-2 my-sm-0"
        type="button"
        @click.prevent="logout"
        v-if="isLoggedin"
      >
        Logout
      </button>
      <form
        class="form-inline my-2 my-lg-0"
        v-if="!isLoggedin"
        @submit.prevent="login"
      >
        <input
          class="form-control mr-sm-2"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mr-sm-2"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <button
          class="btn btn-primary my-2 my-sm-0"
          type="submit"
          v-if="!isLoggedin"
        >
          Login
        </button>
        |
        <button
          class="btn btn-warning my-2 my-sm-0"
          type="button"
          @click.prevent=""
          v-if="!isLoggedin"
        >
          Register
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  created() {
      this.checkLogin()
  },
  watcher: {
      isLoggedin: () => {
          this.isLoggedin = this.$store.state.isLogin
      }
  },
  data() {
    return {
      isLoggedin: false,
      email: "",
      password: ""
    };
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      this.isLoggedin = false;
    },
    login() {
      this.isLoggedin = true
      let dataLogin = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", dataLogin);
      this.email = ''
      this.password = ''
    },
    checkLogin(){
        if (localStorage.access_token) {
            this.isLoggedin = true
        } else {
            this.isLoggedin = false
        }
    }
  }
};
</script>

<style></style>
