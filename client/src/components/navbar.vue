<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-dark">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="" class="nav-link text-white" @click.prevent="goTo('Home')"
            >Home</a
          >
        </li>
        <li class="nav-item">
          <a
            href=""
            class="nav-link text-white"
            @click.prevent="goTo('Products')"
            >Products</a
          >
        </li>
      </ul>
    </div>
    <div class="form-inline my-2 my-lg-0">
      <b-button
        class="bg-success"
        @click.prevent="goTo('Cart')"
        v-if="isLoggedin"
        ><b-icon icon="bag-fill" animation="cylon-vertical"></b-icon>   My Cart</b-button
      >
    </div>
    <div class="form-inline my-2 my-lg-0 ml-2">
      <b-button
        type="button"
        @click.prevent="logout"
        v-if="isLoggedin"
        class="btn btn-danger"
      >
        <b-icon icon="power"> </b-icon>
        Logout
      </b-button>
      <form
        class="form-inline my-2 my-lg-0"
        v-if="!isLoggedin"
        @submit.prevent="login"
      >
        <input
          class="form-control mr-sm-2"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mr-sm-2"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <b-button
          class="btn btn-primary my-2 my-sm-0 bg-success"
          type="submit"
          v-if="!isLoggedin"
        >
          <b-icon icon="person-fill" animation="cylon"></b-icon>  Login
        </b-button>
        |
        <b-button
          v-b-modal.modal-register
          class="btn btn-warning my-2 my-sm-0"
          type="button"
          v-if="!isLoggedin"
        >
          Register
        </b-button>
        <!-- Register Modal -->
        <b-modal id="modal-register" centered title="Register" hide-footer>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="name_reg"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="email_reg"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password_reg"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Create account for free
            </button>
          </form>
        </b-modal>
      </form>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const HEROKU_URL = 'https://peaceful-thicket-02203.herokuapp.com'
// const DEV_URL = "http://localhost:3000";
export default {
  created() {
    this.checkLogin();
  },
  data() {
    return {
      isLoggedin: "",
      email: "",
      password: "",
      name_reg: "",
      email_reg: "",
      password_reg: ""
    };
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      Swal.fire({
        icon: "success",
        title: "See you again soon!"
      });
      this.email = "";
      this.password = "";
      this.isLoggedin = false;
      this.$router.push({ name: 'Home' })
    },
    login() {
      axios({
        method: "POST",
        url: `${HEROKU_URL}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          console.log(data.data);
          const storage = {
            access_token: data.data.access_token,
            role: data.data.role
          };
          localStorage.setItem("access_token", storage.access_token);
          localStorage.setItem("role", storage.role);
          Swal.fire({
            icon: "success",
            title: "Login successfull",
            text: "Happy shopping!"
          });
          this.isLoggedin = true;
        })
        .catch(response => {
          Swal.fire({
            icon: "warning",
            title: response.response.data.msg
          });
          this.email = "";
          this.password = "";
        });
    },
    checkLogin() {
      if (localStorage.access_token) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    },
    register() {
      axios({
        method: "POST",
        url: `${HEROKU_URL}/users/register`,
        data: {
          name: this.name_reg,
          email: this.email_reg,
          password: this.password_reg
        }
      })
        .then(data => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("role", data.data.role);
          Swal.fire({
            icon: "success",
            title: `Welcome ${this.name_reg}`,
            text: "Happy shopping!"
          });
          this.isLoggedin = true;
          this.name_reg = "";
          this.email_reg = "";
          this.password_reg = "";
          this.$router.push({ name: "Home" });
        })
        .catch(response => {
          console.log(response.response);
          Swal.fire({
            icon: "warning",
            title: response.response.data
          });
        });
    }
  }
};
</script>

<style></style>
