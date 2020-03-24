<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" @submit.prevent="register">
          <img src="../images/logo.png" class="login100-form-title" />

          <div class="wrap-input100 validate-input m-b-15" style="margin-top:50px;">
            <input
              v-model="fullname"
              class="input100"
              type="text"
              name="fullname"
              placeholder="Fullname"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input m-b-15">
            <input v-model="email" class="input100" type="email" name="email" placeholder="Email" />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              v-model="password"
              class="input100"
              type="password"
              name="pass"
              placeholder="Password"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn mt-5">
            <button class="login100-form-btn">Sign Up</button>
          </div>

          <div class="flex-col-c p-t-65 p-b-40">
            <span class="txt1 p-b-9">Already have an account?</span>

            <a href="/login" @click.prevent="changePage" class="txt3">Sign in now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axios } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  name: "Register",
  data() {
    return {
      fullname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    changePage() {
      this.$router.push({
        path: "/login"
      });
    },
    async register() {
      try {
        let input = {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        };
        let { data } = await axios.post("/customer/register", input);
        localStorage.setItem("access_token", data.access_token);
        Toast.fire({
          icon: "success",
          title: "Login successfully."
        });
        this.$router.push({
          path: "/"
        });
      } catch (error) {
        if (error.response.data[0].message === "email must be unique") {
          Swal.fire({
            icon: "error",
            title: "Email has already been registered.",
            confirmButtonColor: "#39387a"
          });
        } else if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Please fill out all the form.",
            confirmButtonColor: "#39387a"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      }
    }
  }
};
</script>