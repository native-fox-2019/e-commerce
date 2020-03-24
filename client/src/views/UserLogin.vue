<template>
<div class="body">
    <UserNavbar/>
    <div class="container">
    <div class="row">
        <div class="col-6">
            <div class="login-left"></div>
        </div>
        <div class="col-6">
            <div class="login">
            <h3> Login </h3>
                <form id="form-login" action="" method="POST">
                    <label for="fname">Email:</label><br>
                    <input type="text" id="email" name="email" value="" v-model="email" required>
                    <br>
                    <label for="lname">Password:</label>
                    <br>
                    <input type="password" name="password" value="" v-model="password" required>
                    <br><br>
                    <input type="submit" class="btn btn-warning" value="Submit"
                    v-on:click.prevent="login">
                </form>
            </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
import UserNavbar from '../components/UserNavbar.vue';

export default {
  name: 'UserLogin',
  components: {
    UserNavbar,
  },
  data() {
    return {
      alert: false,
      msg: '',
      baseUrl: 'http://localhost:3000',
      email: '',
      password: '',
    };
  },
  created() {

  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/user/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token);
          this.$store.state.usertoken = localStorage.getItem('token');
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          console.log(error);
          this.alert = true;
          this.msg = 'Wrong Email/Password!';
        });
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);

.login {
  border-color: black;
  border-style : double;
  color: white;
  width: 50%;
  text-align: center;
  font-family: 'Lato';
  font-weight: 300;
  margin : 120px auto;
  background: rgb(5, 5, 5);
  padding: 15px;
}
img{
    width: 87.8%;
    height: 87.8%;
}
.login-left{
    margin : 50px auto;
    background-image: url("../assets/Hello.png");
    height: 400px;
    width: 500px;
}

</style>
