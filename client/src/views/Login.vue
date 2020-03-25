<template>
  <div class="container mr-auto ml-auto">
    <div>
      <h3>Login</h3>
    </div>
    <div class="row d-flex flex-column m-3">
      <label>Email :</label>
      <input label="Email" type="text" v-model="email" />
      <label>Password :</label>
      <input :type="showPassword?'text':'password'" v-model="password" class="form-control" />
      <div class="form-group form-check">
        <input type="checkbox" v-model="showPassword" />Show Password
        <label class="form-check-label" for="exampleCheck1"></label>
      </div>
      <input type="submit" @click.prevent="loginUser" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },

  methods: {
    loginUser() {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        if (response.data.tokenAdmin) {
          localStorage.setItem("tokenAdmin", response.data.tokenAdmin);
          this.$router.push("product");
        } else if (response.data.tokenCustomer) {
          localStorage.setItem("tokenCustomer", response.data.tokenCustomer);
          this.$router.push("/");
        }
      });
    }
  }
};
</script>