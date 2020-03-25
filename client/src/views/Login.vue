<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            md8
          >
            <v-alert
              v-model="alert"
              dismissible
              type="error"
            >
              {{ message }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar
                color="green darken-4"
                dark
                flat
              >
                <v-icon @click="back">mdi-arrow-left-thick</v-icon>
                <v-spacer></v-spacer>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login" :disabled="dialog"
                  :loading="dialog">
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="email"
                  ></v-text-field>
                  <v-dialog
                    v-model="dialog"
                    hide-overlay
                    persistent
                    width="300"
                  >
                    <v-card
                      color="green darken-3"
                      dark
                    >
                      <v-card-text>
                        Please stand by
                        <v-progress-linear
                          indeterminate
                          color="white"
                          class="mb-0"
                        ></v-progress-linear>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn block color="green darken-4" dark type="submit">Login</v-btn>
                </v-card-actions>

                </v-form>
              </v-card-text>
              <div>
                <v-spacer></v-spacer>
                <p class="text-center">OR</p>
              </div>
              <v-card-actions>
                <v-btn block color="white darken-4" type="button"
                @click="toRegister">Register With Email</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn block color="white darken-4" type="button">Login With Google</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      message: '',
      email: '',
      password: '',
      alert: false,
    };
  },
  methods: {
    back() {
      this.$router.push('/');
    },
    toRegister() {
      this.$router.push('/register');
    },
    login() {
      axios.post('https://hidden-cliffs-82328.herokuapp.com/login', {
        email: this.email,
        password: this.password,
      })
        .then((result) => {
          this.dialog = true;
          setTimeout(() => {
            this.dialog = false;
            localStorage.setItem('usertoken', result.data.usertoken);
            this.$router.push('/');
          }, 4000);
        })
        .catch((err) => {
          this.alert = true;
          this.message = err.response.data.message;
        });
    },
  },
  watch: {
  },
};
</script>
