<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          <h2 class="mt-4 mb-4">Login</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Your registered email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Your password"
            />
          </div>
          <button type="button" class="btn btn-danger mt-1 mb-3" v-on:click="submit">Login</button>
          <p>
            Don't have an account?
            <router-link to="/register" class="text-danger">Register</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
      fetch("http://localhost:3000/users/login", {
        method: "post",
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(data => {
          this.$store.commit("setJwt", data.token);
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
