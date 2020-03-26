<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <h2 class="mt-4 mb-4">Register</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Your email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Create new password"
            />
          </div>
          <button type="button" class="btn btn-danger mt-1 mb-3" v-on:click="submit">Register</button>
          <p>
            Have an account?
            <router-link to="/login" class="text-danger">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../baseUrl";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    jwt() {
      return this.$store.state.jwt;
    }
  },
  methods: {
    submit() {
      axios
        .post(`${baseUrl}users/register`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$store.commit("setJwt", response.data.token);
          this.$router.push("/");
        })
        .catch(() => {});
    }
  }
};
</script>
