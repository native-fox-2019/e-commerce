<template>
  <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
    <img src="../images/icon-google.png" alt="GOOGLE" />
    Google
  </g-signin-button>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
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
  data() {
    return {
      googleSignInParams: {
        client_id:
          "157670388023-8hp165p7r8tbo59v5lrcoag7dn5oi2s3.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios.post("/customer/google", { id_token }).then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("fullname", data.fullname);
        this.$router.push({
          path: "/"
        });
        Toast.fire({
          icon: "success",
          title: "Login successfully."
        });
      });
    },
    onSignInError(error) {
      errorHandler(error);
    }
  }
};
</script>
<style scoped>
.g-signin-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  background-color: #b52424;
  border-radius: 25px;
  cursor: pointer;

  font-family: Ubuntu-Bold;
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.g-signin-button:hover {
  background-color: #382b4d;
}
.g-signin-button img {
  width: 19px;
  margin-right: 10px;
  padding-bottom: 1px;
}
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
