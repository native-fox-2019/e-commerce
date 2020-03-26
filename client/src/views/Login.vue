<template>
  <div class="login-register">
    <div class="container">
      <form class="login" @submit.prevent="onLogin">
        <h1 style="margin-bottom: 14px">LOGIN</h1>
        <label>Email</label>
        <input v-model="login_email" type="email" placeholder="enter your email" />
        <label>Password</label>
        <input v-model="login_password" type="password" />
        <Error v-if="loginError" :errors="errors" />
        <button class="btn" type="submit">Login</button>
      </form>

      <form class="register" @submit.prevent="onRegister">
        <h1 style="margin-bottom: 14px">REGISTER</h1>
        <label>Name</label>
        <input v-model="name" type="text" placeholder="enter your name">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="enter your email" />
        <label>Password</label>
        <input v-model="password" type="password" />
        <Error v-if="registerError" :errors="errors" />
        <button class="btn" type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import Error from '../components/Error.vue';

export default {
  name: 'Login',
  components: {
    Error,
  },
  created() {
    this.setOnHome(false);
  },
  data() {
    return {
      login_email: '',
      login_password: '',
      name: '',
      email: '',
      password: '',
      errors: null,
      loginError: false,
      registerError: false,
    };
  },
  watch: {
    login_email() {
      this.errors = null;
    },
    login_password() {
      this.errors = null;
    },
    name() {
      this.errors = null;
    },
    email() {
      this.errors = null;
    },
    password() {
      this.errors = null;
    },
  },
  methods: {
    ...mapMutations(['setOnHome']),
    ...mapActions(['login', 'register']),
    async onLogin() {
      try {
        const obj = {
          email: this.login_email,
          password: this.login_password,
        };
        await this.login(obj);
        this.$router.push('/');
      } catch (err) {
        this.loginError = true;
        this.errors = err.message;
      }
    },

    async onRegister() {
      try {
        const obj = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        await this.register(obj);
        this.$router.push('/');
      } catch (err) {
        this.registerError = true;
        this.errors = err;
      }
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
    justify-content: space-between;
    width: 100%
  }

  .login, .register {
    display: flex;
    flex-direction: column;
  }

  .container form {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container input {
    background: #eee;
    border: none;
    padding: 19px 20px;
    margin: 8px 0;
    width: 50%;
    font-size: 16px;
    font-weight: 400;
  }

  .btn {
    display: block;
    cursor: pointer;
    background-color: black;
    color: white;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    padding: 13px 18px;
    border: 2px solid black;
    text-decoration: none;
    border-radius: 2px;
    width: 30%;
    margin-top: 14px;
  }
</style>
