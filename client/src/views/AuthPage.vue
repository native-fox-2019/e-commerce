<template>
  <div class="AuthPage">
    <div class="h1 my-5" v-if="haveAccount">Login</div>
    <div class="h1 my-5" v-else>Register</div>
    <div class="container text-center shadow pt-3 auth-form">
      <div class="form-group d-flex flex-row justify-content-start">
        <button
          class="btn btn-outline-secondary mx-3"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Back to Main Page"
          @click.prevent="gotoMainPage()"
        >↰</button>
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
      <form class="container text-center" v-else @submit.prevent="register()">
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
      this.$router.push({ path: '/' })
    },
    gotoLogin() {
      this.haveAccount = true
    },
    gotoRegister() {
      this.haveAccount = false
    },
    resetAuthForm() {
      this.username = ''
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
    },
    login() {
      Axios({
        method: 'POST',
        url: 'https://mighty-stream-85910.herokuapp.com/shop/login',
        data: {
          username: this.username,
          password: this.password
        }
      })
      .then(({ data }) => {
        this.resetAuthForm()
        this.$store.dispatch('login', data)
      })
      .catch(err => {
        this.$store.dispatch('showError', err)
      })
    },
    register() {
      if (this.password !== this.passwordConfirm) {
        this.$store.dispatch('showError', {
          message: 'Your Password & Confirm Password didn\'t match!'
        })
        this.password = ''
        this.passwordConfirm = ''
      } else {
        Axios({
          method: 'POST',
          url: 'https://mighty-stream-85910.herokuapp.com/shop/register',
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.resetAuthForm()
          this.haveAccount = true
          this.$store.dispatch('swalMixin', 'Register Success!')
        })
        .catch(err => {
          this.$store.dispatch('showError', err)
        })
      }
    }
  }
}
</script>
