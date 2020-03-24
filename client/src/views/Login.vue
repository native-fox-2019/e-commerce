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
import axios from 'axios';

const server = 'http://localhost:3000';

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
    async onLogin() {
      const obj = {
        email: this.login_email,
        password: this.login_password,
      };
      const { data } = await axios.post(`${server}/login`, obj);
      localStorage.setItem('token', data.token);
      this.$router.push('/');
    },

    async onRegister() {
      const obj = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const { data } = await axios.post(`${server}/register`, obj);
      localStorage.setItem('token', data.token);
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
