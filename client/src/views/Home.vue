<template>
  <div class="bigContainer">
    <nav>
      <div id="logo" @click="toHome">WearIsysm</div>
      <div id="menu">
        <router-link class="menuCategory" to="/baju">Baju</router-link>
        <router-link class="menuCategory" to="/jaket">Jaket</router-link>
        <router-link class="menuCategory" to="/celana">Celana</router-link>
        <router-link class="menuCategory" to="/sepatu">Sepatu</router-link>
      </div>
      <div id="iconNav">
        <div id="cart">
          <img src="../assets/shopping-bag.svg" alt />
        </div>
        <router-link id="login" to="/login">
          <img src="../assets/log-in.svg" alt v-if="!isLoginPage" />
          <img src="../assets/log-out.svg" alt v-if="isLoginPage" @click="logoutUser" />
        </router-link>
      </div>
    </nav>

    <router-view />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from "../components/Login";
import Footer from "../components/customer/Footer";
import { veryfingJWT } from "../components/helper/jwt";
export default {
  name: "Home",
  components: {
    // LoginPage,
    Footer
  },
  data() {
    return {
      isLoginPage: false,
      category: ""
    };
  },
  mounted() {
    if (localStorage.token) {
      const payload = veryfingJWT(localStorage.token);
      if (payload.role === "user") {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    }
    this.$store.dispatch("getAll");
  },
  created() {
    this.$store.dispatch("getAll");
  },
  computed: {},
  methods: {
    logoutUser() {
      localStorage.clear();
      isLoginPage = false;
      this.$router
        .push({
          path: "/"
        })
        .catch(() => {});
    },
    toHome() {
      this.$router
        .push({
          path: "/"
        })
        .catch(() => {});
    }
  }
};
</script>
<style  scoped>
a {
  text-decoration: none;
  color: #707070;
}
nav {
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bigContainer {
  background-color: #fff;
  /* padding: 0px 2em; */
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}
#logo {
  display: flex;
  align-items: center;
  font-size: 1.5em;
  letter-spacing: 5px;
}
#menu,
#iconNav {
  display: flex;
}
#menu {
  width: 50em;
  justify-content: center;
}
.menuCategory {
  margin: 0px 2em;
  /* width: 100%; */
  cursor: pointer;
  letter-spacing: 2px;
}
#cart {
  margin-right: 2em;
  cursor: pointer;
}
#login {
  cursor: pointer;
}
#logo {
  cursor: pointer;
}
</style>
