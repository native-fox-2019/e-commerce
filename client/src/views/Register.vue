<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 md8>
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
                <v-btn>
                  <v-icon>mdi-back</v-icon>
                </v-btn>
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

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
                <v-btn block color="white darken-4" type="button">Register With Email</v-btn>
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
      message: '',
      email: '',
      password: '',
      alert: false,
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password,
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          this.alert = true;
          this.message = err.response.data.message;
        });
    },
  },
};
</script>
