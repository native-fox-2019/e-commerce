<template>
    <div class="page">
        <div class="login">
        <div>
            <h3>Sign In</h3>
            <form @submit.prevent="logIn">
                <input type="text" placeholder="Email" v-model="email"><br>
                <input type="password" placeholder="Password" v-model="password"><br>
                <button type="submit">Sign In</button>
            </form>
            <p style="color: red" v-if="loginError">{{ loginError }}</p>
        </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  created() {
    this.$store.commit('setPage', 'login');
    if (localStorage.token) {
      this.$router.push('/');
    }
  },
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    logIn() {
      const options = {
        url: `${this.$store.state.baseUrl}/user/login`,
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
      };
      axios(options)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.$store.commit('changeIsLogin', true);
          this.email = '';
          this.password = '';
          this.loginError = '';
          this.$router.back();
        })
        .catch((err) => {
          this.loginError = '';
          this.loginError = err.response.data.msg;
        });
    },
  },
};
</script>
