<template>
  <div class="boxlogin">
    <div id="headLogin">
      <h2>Register</h2>
    </div>
    <div>
      <form @submit.prevent="loginAction">
        <input type="test" placeholder="username" v-model="formRegister.username" />
        <hr />
        <input type="email" placeholder="email" v-model="formRegister.email" />
        <hr />
        <input type="password" placeholder="password" v-model="formRegister.password" />
        <hr />
        <button type="submit" class="btnSubmit">Submit</button>
        <button type="button" class="btnSubmit" @click="toLoginForm">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const server = `http://localhost:3000`;
// const server = "https://shrouded-mesa-95537.herokuapp.com";
export default {
  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginAction() {
      axios({
        method: "POST",
        url: `${server}/users/register`,
        data: {
          username: this.formRegister.username,
          email: this.formRegister.email,
          password: this.formRegister.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data);
          this.$router
            .push({
              path: "/"
            })
            .catch(() => {});
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
    toLoginForm() {
      this.$emit("toLogin");
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
</style>