<template>
  <div class="header">
    <nav :class="{ change: !onHome }">
      <ul class="navlist start">
        <li>
          <button @click="menCollection" class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">MEN</p>
            </div>
          </button>
        </li>
        <li>
          <button class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">WOMEN</p>
            </div>
          </button>
        </li>
      </ul>
      <h4 @click="home" style="font-size: 30px; cursor: pointer;" >KICKALIZER</h4>
      <ul class="navlist end">
        <li>
          <button v-if="getStatus" class="nav-button">
            <div class="nav-button-content nohover">
              <!-- <p class="nav-content-description">CART</p> -->
              <a @click="cartOpen" ><i class="fas fa-shopping-cart fa-2x"></i></a>
            </div>
          </button>
        </li>
        <li>
          <button @click="logout" v-if="getStatus" style="margin-right: 18px" class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">LOGOUT</p>
            </div>
          </button>

          <button @click="login" v-if="!getStatus" style="margin-right: 18px" class="nav-button">
            <div class="nav-button-content">
              <p class="nav-content-description">LOGIN</p>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  created() {
    if (localStorage.getItem('token')) {
      this.setStatus(true);
    }

    if (this.$route.path === '/') {
      this.setOnHome(true);
    }
  },
  computed: mapGetters(['getStatus', 'onHome']),
  methods: {
    ...mapMutations(['setStatus', 'openCart', 'setOnHome']),
    ...mapActions(['fetchCart', 'checkStatus']),
    login() {
      this.$router.push('/login');
    },

    logout() {
      localStorage.removeItem('token');
      this.setStatus(false);
      this.setOnHome(true);
      this.$router.push('/');
    },

    home() {
      this.setOnHome(true);
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },

    menCollection() {
      this.checkStatus();
      if (this.$route.path !== '/collections/mens') {
        this.$router.push('/collections/mens');
      }
    },

    async cartOpen() {
      await this.fetchCart();
      this.openCart(true);
    },
  },
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  li, a, button {
    text-decoration: none;
  }

  li {
    position: relative;
    align-items: center;
  }

  .header {
    display: flex;
    position: fixed;
    top: 0px;
    z-index: 100;
    width: 100%;
  }

  nav {
    display: flex;
    position: relative;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin: 0px;
  }

  .navlist {
    display: flex;
    align-items: center;
    list-style: none;
    width: 43%;
  }

  .navlist.start {
    justify-content: flex-start;
  }

  .navlist.end {
    justify-content: flex-end;
  }

  .nav-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    border-width: 0px;
    min-width: 42px;
    min-height: 42px;
    margin: 0px 0px 0px 18px;
  }

  .nav-button-content {
    display: flex;
    justify-content: center;
    margin: 0px 9px;
    border-bottom: 2px solid transparent;
    transition: border 100ms ease-in-out 0s;
  }

  .nav-button-content:hover {
    border-color: white;
  }

  .nav-button-content.nohover:hover {
    border-bottom: none;
  }

  .nav-content-description {
    font-weight: 900;
    font-size: 12px;
    line-height: 1.75;
    letter-spacing: 1.7px;
    color: white;
  }

  .change {
    background-color: white;
  }

  .change
  p {
    color: #2c3e50;
  }
</style>
