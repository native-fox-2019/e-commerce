<template>
  <div class="AuthPage">
    <div class="h1 my-5">{{ haveAccount ? 'Login' : 'Register' }}</div>
    <div class="container text-center shadow pt-3 auth-form">
      <div class="form-group d-flex flex-row justify-content-start">
        <button class="btn btn-outline-secondary mx-3" @click.prevent="gotoMainPage()">↰</button>
      </div>
      <!-- LOGIN START -->
      <form class="container text-center" v-if="haveAccount" @submit.prevent="login()">
        <div class="form-group">
          <input class="form-control text-center mb-3" type="text" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="password" placeholder="Password" v-model="password">
        </div>
        <div class="form-group">
          <input class="form-control btn btn-primary" type="submit" value="Log In">
        </div>
        <div class="form-group">
          <p class="text-secondary">don't have an account yet?</p>
        </div>
        <div class="form-group">
          <button class="form-control btn btn-primary mb-3" @click.prevent="gotoRegister()">Go to Register</button>
        </div>
      </form>
      <!-- LOGIN END -->

      <!-- REGISTER START -->
      <form class="container text-center" v-if="!haveAccount" @submit.prevent="register()">
        <div class="form-group">
          <input class="form-control text-center mb-3" type="text" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="password" placeholder="Password" v-model="password">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="password" placeholder="Confirm Password" v-model="passwordConfirm">
        </div>
        <div class="form-group">
          <input class="form-control btn btn-primary" type="submit" value="Register">
        </div>
        <div class="form-group">
          <p class="text-secondary">already have an account?</p>
        </div>
        <div class="form-group">
          <button class="form-control btn btn-primary mb-3" @click.prevent="gotoLogin()">Go to Login</button>
        </div>
      </form>
      <!-- REGISTER END -->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from 'axios'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  name: 'AuthPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      haveAccount: true
    }
  },
  methods: {
    gotoMainPage() {
      this.$router.push({
        path: '/'
      })
    },
    gotoLogin() {
      this.haveAccount = true
    },
    gotoRegister() {
      this.haveAccount = false
    },
    login() {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/shop/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      .then(({ data }) => {
        localStorage.access_token = data.access_token
        this.$router.push({
          path: '/'
        })
        Toast.fire({
          icon: 'success',
          title: 'Login Success!'
        })
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    register() {
      if (this.password !== this.passwordConfirm) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `Your Password & Confirm Password didn't match!`
        })
        this.password = ''
        this.passwordConfirm = ''
      } else {
        Axios({
          method: 'POST',
          url: 'http://localhost:3000/shop/register',
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
          },
          headers: { access_token: localStorage.access_token }
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Register Success!',
            html: `Username: ${data.username}
                  <br>Email: ${data.email}
                  <br>Role: ${data.role}`
          })
          this.username = ''
          this.email = ''
          this.password = ''
          this.passwordConfirm = ''
          this.role = ''
        })
        .catch(err => {
          let msg = null;
          if (err.response) {
            if (Array.isArray(err.response.data.message)) {
              msg = err.response.data.message.join('<br>');
            } else {
              msg = err.response.data.message;
            }
          } else if (err.request) {
            msg = err.request;
          } else {
            msg = err.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: `${msg}`
          })
        })
      }
    }
  }
}
</script>
