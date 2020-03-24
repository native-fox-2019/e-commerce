<template>
  <div>
    <form @submit.prevent="onLogin">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="enter your email" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

const server = 'http://localhost:3000';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isError: false,
    };
  },
  methods: {
    async onLogin() {
      const obj = {
        email: this.email,
        password: this.password,
      };
      const { data } = await axios.post(`${server}/login`, obj);
      localStorage.setItem('token', data.token);
    },
  },
};
</script>

<style>
</style>
