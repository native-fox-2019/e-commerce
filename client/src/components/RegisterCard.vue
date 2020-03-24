<template>
<div>
  <Loading v-if="loading" />
  <form class="mx-auto mt-3" style="width: 400px;" @submit.prevent="registerUser">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <div class="form-group">
      <label>Email address</label>
      <input type="email" class="form-control" v-model="email">
      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password">
    </div>
    <a href="" @click.prevent="loginForm">Already have an account? Login</a><br>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </form>
</div>
</template>

<script>
import Loading from './Loading.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Loading
  },
  computed: mapState(['loading']),
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    loginForm() {
      this.$router.push('/login');
    },
    registerUser() {
      const obj = { name: this.name, email: this.email, password: this.password };
      this.$store.dispatch('registerUser', obj);
    }
  }
}
</script>