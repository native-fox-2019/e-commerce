<template>
<div class="body">
    <UserNavbar/>
    <div class="container">
    <div class="row">
        <div class="col-6">
            <div class="register-left"></div>
        </div>
        <div class="col-6">
                <div class="register">
                <h3> Register </h3>
                        <form id="form-signUp" action="" method="POST">
                            <label for="fname">Name:</label><br>
                            <input type="text" id="Name" name="Name" value="" v-model="name"
  required><br>
                            <label for="fname">Email:</label><br>
                            <input type="text" id="email" name="email" value="" v-model="email"
 required><br>
                            <label for="lname">Password:</label><br>
                            <input type="password" name="password" value="" v-model="password"
 required><br><br>
                            <input type="submit" class="btn btn-warning" value="Submit"
v-on:click.prevent="register">
                        </form>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
</div>
</template>
<script>
import axios from 'axios';
import UserNavbar from '../components/UserNavbar.vue';
import Footer from '../components/footer.vue';

export default {
  name: 'UserRegister',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      name: '',
      email: '',
      password: '',
    };
  },
  components: {
    UserNavbar,
    Footer,
  },
  created() {

  },
  methods: {
    register() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/user/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      })
        .then((data) => {
          console.log(data);
          this.$router.push({ name: 'UserLogin' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);

.register {
  border-color: black;
  border-style : double;
  color: white;
  width: 50%;
  text-align: center;
  font-family: 'Lato';
  font-weight: 300;
  margin : 80px auto;
  background: rgb(5, 5, 5);
  padding: 15px;
}
img{
    width: 87.8%;
    height: 87.8%;
}
.register-left{
    margin : 50px auto;
    background-image: url("../assets/watch.png");
    height: 400px;
    width: 500px;
}

</style>
