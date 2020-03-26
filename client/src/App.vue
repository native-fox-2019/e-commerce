<template>
    <div id="app">
        <header>
            <router-link to="/" style="text-decoration: none;">
                <h4>Toko Gunpla</h4>
            </router-link>
            <ul class="middle-nav">
                <li>
                    <router-link to="/">
                        <span>See Product</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/cart">
                        <span v-if="this.$store.state.isLogin">My Cart</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/order">
                        <span v-if="this.$store.state.isLogin">My Order</span>
                    </router-link>
                </li>
            </ul>
            <nav>
                <ul class="nav_link">
                    <li>
                        <router-link to="/login">
                            <button class="btn" v-if="!this.$store.state.isLogin">Login</button>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register">
                            <button class="btn" v-if="!this.$store.state.isLogin">Register</button>
                        </router-link>
                    </li>
                    <li>
                        <button
                            class="btn"
                            v-if="this.$store.state.isLogin"
                            v-on:click="logout"
                        >Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
        <img src="../preloader.gif" class="preloader" v-if="this.$store.state.isLoading" />
        <router-view />
        <div class="footer">
            <div class="footer-content">
                <p>Contact Person:</p>
                <p>email: rqz.agastya@gmail.com</p>
            </div>
            <div class="footer-bottom">&copy; Toko Gunpla | by Gusti Agung A T</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "App",
    data() {
        return {};
    },
    methods: {
        logout: function() {
            localStorage.removeItem("access_token");
            this.$store.state.isLogin = false;
            this.$router.push({ name: "Login" });
        }
    }
};
</script>
