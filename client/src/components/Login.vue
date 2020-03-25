<template>
  <div class="loginregisBox">
    <div class="boxlogin" v-if="!registerForm">
      <div id="headLogin">
        <h2>Login</h2>
      </div>
      <div>
        <form @submit.prevent="loginAction">
          <input type="email" placeholder="email" v-model="formLogin.email" />
          <hr />
          <input type="password" placeholder="password" v-model="formLogin.password" />
          <hr />
          <button type="submit" class="btnSubmit">Submit</button>
          <button type="button" class="btnSubmit" @click="toRegisterForm">register</button>
        </form>
      </div>
    </div>
    <Register v-if="registerForm" @toLogin="toLogin" />
  </div>
</template>

<script>
import Register from "../components/Register";
import axios from "axios";
import Swal from "sweetalert2";
import { veryfingJWT } from "../components/helper/jwt";
const server = `http://localhost:3000`;
// const server = "https://shrouded-badlands-50874.herokuapp.com";
export default {
  components: {
    Register
  },
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      },
      registerForm: false
    };
  },
  methods: {
    loginAction() {
      axios({
        method: "POST",
        url: `${server}/users/login`,
        data: {
          email: this.formLogin.email,
          password: this.formLogin.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data);
          const token = veryfingJWT(data);
          if (token.role === "admin") {
            this.$router.push({
              path: "/dashboard",
              name: "Dashboard"
            });
            // .catch(() => {});
          } else if (token.role === "user") {
            this.$router
              .push({
                path: "/"
              })
              .catch(() => {});
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `email or password wrong`
          });
        });
    },
    toRegisterForm() {
      this.registerForm = true;
    },
    toLogin() {
      this.registerForm = false;
    }
  }
};
</script>

<style scoped>
#headLogin {
  color: #707070;
}
.boxlogin {
  width: 30em;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.boxlogin h2 {
  color: #707070;
  letter-spacing: 0.1em;
}
input {
  text-align: center;
  padding: 0px 2em;
  width: 15em;
  border: none;
  height: 2.5em;
  font-size: 1em;
  color: #707070;
}
input:focus {
  outline-color: #707070;
}
.btnSubmit {
  font-family: "Roboto", sans-serif;
  width: 10em;
  height: 2.5em;
  font-size: 1em;
  letter-spacing: 2px;
  background-color: #707070;
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  margin-right: 1em;
}
.btnSubmit:hover {
  color: #707070;
  border: 2px solid #707070;
  background-color: #fff;
}
.loginregisBox {
  display: flex;
  justify-content: center;
}
</style>