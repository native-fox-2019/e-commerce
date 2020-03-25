<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgb(215, 17, 73);">
    <div class="container">
      <router-link class="navbar-brand" to="/">COVID-19 Supplies</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item active dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Categories</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/category/Protections">Protections</router-link>
              <router-link class="dropdown-item" to="/category/Sanitizers">Sanitizers</router-link>
              <router-link class="dropdown-item" to="/category/Disinfectants">Disinfectants</router-link>
              <router-link class="dropdown-item" to="/category/Supplements">Supplements</router-link>
              <router-link class="dropdown-item" to="/category/Drugs">Drugs</router-link>
            </div>
          </li>
        </ul>
        <Account />
      </div>
    </div>
  </nav>
</template>

<script>
import Account from "./Account.vue";

export default {
  name: "Navbar",
  components: {
    Account
  }
};
</script>