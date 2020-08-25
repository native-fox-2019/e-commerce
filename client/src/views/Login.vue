<template>
  <div style="
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
    margin-left: 50vh;
    width: 50vw;
    justify-content: center;
    ">

  <v-form
    style="
    margin-top: 70px;
    "
    ref="form"
    class="container"
  >
  <h1>Login</h1>

    <v-alert v-if="err" type="error">
      {{errMsg}}
    </v-alert>

    <v-alert v-if="successReg && !err" type="success">
      {{successMsg}}
    </v-alert>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      type=password
      v-model="password"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="loginSubmit"
    >
      Login
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="goHome"
    >
      Back to home
    </v-btn>
  </v-form>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    err: false,
    valid: true,
    email: '',
    password: '',
    secret: '',
    errMsg: '',
    successMsg : 'Your email has been Registered',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  computed: {
    successReg() {
      return this.$store.state.successReg
    }
  },
  methods: {
    goHome() {
      this.$router.push({name:'Home'})
    },
    loginSubmit(){
        this.$axios({
          url: '/users/login',
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(({ data }) => {
          if (data) {
            localStorage.setItem('token', data.token)
              this.$router.push({ name: "Home"})
              this.$store.commit('setToken')
          } else if(!data){
            this.err = true,
            this.errMsg = data.data
          }
        })
        .catch(({response}) =>{
          console.log(response);
          this.errMsg= response.data
          this.err = true
        })
    }
  },
}
</script>
<style>

</style>