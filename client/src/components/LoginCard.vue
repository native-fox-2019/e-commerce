<template>
<form @submit.prevent="loginUser">
  <h1>Sign In</h1>
  <div class="social-container">
      <a href="" class="social"><i class="fab fa-google-plus-g"></i></a>
  </div>
  <span>or use your account</span>
  <input type="email" placeholder="Email" v-model="email" class="mb-1" />
  <input type="password" placeholder="Password" v-model="password" class="mb-2" />
  <button type="submit">Sign In</button>
</form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState(['slide']),
  data() {
    return {
      email: '',
      password: '',
    }
  },
  watch: {
    slide() {
      this.email = '';
      this.password = '';
    }
  },
  methods: {
    loginUser() {
      const obj = { email: this.email, password: this.password };
      this.$store.dispatch('loginUser', obj);
    }
  }
}
</script>

<style>

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

</style>