<template>
    <nav class="navbar navbar-light shadow mb-3 position-sticky sticky-top" style="background-color: rgba(255,255,255,.75)">
    <a href="#" class="navbar-brand" @click.prevent="gotoMainPage()">Tunggalika</a>
    <form class="form-inline">
        <button
            class="btn btn-outline-secondary"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Back to Main Page"
            @click.prevent="gotoMainPage()"
            v-if="this.$route.path === '/cart'"
        >↰</button>
        <b-button
            variant="outline-success"
            class="ml-2 my-sm-0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="My Shopping Cart"
            @click.prevent="gotoCart()"
            v-if="this.$route.path === '/'"
        >🛍</b-button>
            <b-button
            variant="outline-danger"
            class="ml-2 my-sm-0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Log Out"
            @click.prevent="triggerLogout()"
            v-if="isLogin"
        >⇱</b-button>
        <b-button
            variant="outline-primary"
            class="ml-2 my-sm-0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Login / Register"
            @click.prevent="gotoAuth()"
            v-else
        >😃</b-button>
    </form>
    </nav>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export default {
    name: 'Navbar',
    methods: {
        gotoCart() {
            this.$store.dispatch('gotoCart')
            // this.$router.push({ path: '/cart' })
        },
        triggerLogout() {
            Swal.fire({
                title: 'Log Out?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    // delete localStorage.access_token
                    // this.$store.state.productList = []
                    // this.$router.push({ path: '/' })
                    this.$store.dispatch('logout')
                }
            })
        },
        gotoAuth() {
            this.$router.push({
                path: '/auth'
            })
        },
        gotoMainPage() {
            this.$router.push({ path: '/' })
        }
    },
    computed: {
        isLogin() {
            return localStorage.access_token
        }
    }
}
</script>