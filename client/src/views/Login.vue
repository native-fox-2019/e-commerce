<template>
    <div class="wrap d-flex justify-content-center align-items-center">    
    <div class="middle">
      <b-container class="">
        <b-card class="rounded">
          <b-card-header
            class="text-center"
            style="background-color: #2e5472 ; color: #ffffff; position: relative; margin-top: -80px; border-radius: 20px">
            <img src="../assets/logo.png" alt="" srcset="" width="50px">
            <h4>Login</h4>
          </b-card-header>
          <b-card-body>
            <b-form @submit.prevent="login">
              <b-form-group
                id="input-group-1"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Enter Email"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Enter Password"
                ></b-form-input>
              </b-form-group>
              <div class="d-flex justify-content-center">
              <b-button type="submit" variant="info">Submit</b-button>
              </div>
            </b-form>
          </b-card-body>
            <div class="d-flex justify-content-end">
              <small>
                <router-link to="/register">not have accout? click here</router-link>
              </small>
            </div>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
     this.$axios({
        method : 'post',
        url : 'user/login',
        data : {
          email : this.email,
          password : this.password
        }
      })
      .then(({data})=>{
        localStorage.setItem('name', data.name)
        localStorage.setItem('token', data.token)
        this.$router.push({
          path : '/'
        })
      })
      .catch(({response})=>{
        console.log(response.data)
        this.$swal.fire({
          icon: 'error',
          html: response.data.message,
        })
      })
    }
  }
}
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #2c3e50;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3498db, #2c3e50);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #3498db, #2c3e50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>