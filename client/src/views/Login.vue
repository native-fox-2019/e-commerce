<template>
  <div class="login-register">
    <div class="container">
      <form class="login" @submit.prevent="onLogin">
        <label>Email</label>
        <input v-model="login_email" type="email" placeholder="enter your email" />
        <label>Password</label>
        <input v-model="login_password" type="password" />
        <button type="submit">Login</button>
      </form>

      <form class="register" @submit.prevent="onRegister">
        <label>Name</label>
        <input v-model="name" type="text" placeholder="enter your name">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="enter your email" />
        <label>Password</label>
        <input v-model="password" type="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      login_email: '',
      login_password: '',
      name: '',
      email: '',
      password: '',
      isError: false,
    };
  },
  methods: {
    ...mapActions(['login', 'register']),
    async onLogin() {
      const obj = {
        email: this.login_email,
        password: this.login_password,
      };
      await this.login(obj);
      this.$router.push('/');
    },

    async onRegister() {
      const obj = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      await this.register(obj);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .login-register {
    position: relative;
    /* background-color: #f1ebe7; */
    background-color: #e6ceb5;
    padding: 200px 0;
  }

  .login-register
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 500px;
  }

  .login, .register {
    display: flex;
    flex-direction: column;
  }
</style>
