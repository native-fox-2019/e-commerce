<template>
  <!-- <div id="navbar"> -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="grey lighten-2"
    >
    <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="55"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/logo-name.png"
          width="100"
        />
      </div>
      <v-spacer />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
      />
      <v-spacer />
      <v-btn icon @click="toCart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-menu bottom center offset-y="true">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-avatar
                  size="32px"
                  item
                >
                  <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>
  <!-- </div> -->
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { icon: 'mdi-help-circle', text: 'Help' },
    ],
  }),
  methods: {
    login() {},
    logout() {
      localStorage.removeItem('usertoken');
    },
    toCart() {},
  },
};
</script>
