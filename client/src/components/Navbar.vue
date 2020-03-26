<template>
    <nav class="navbar navbar-light shadow mb-3 position-sticky sticky-top" style="background-color: rgba(255,255,255,.5)">
    <a class="navbar-brand">Tunggalika</a>
    <form class="form-inline">
        <b-button variant="outline-success" class="m-2 my-sm-0" @click.prevent="triggerAddForm()" v-b-modal.ProductModalModal>🛍</b-button>
        <b-button variant="outline-danger" class="m-2 my-sm-0" @click.prevent="triggerLogout()" v-if="isLogin">⇱</b-button>
        <b-button variant="outline-primary" class="m-2 my-sm-0"  @click.prevent="gotoAuth()" v-else>😃</b-button>
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
        ...mapActions(['logout']),
        triggerAddForm() {
            this.productFormReset()
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
                    delete localStorage.access_token
                    this.$store.state.productList = []
                    this.$router.push({
                        path: '/'
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Logout Success!'
                    })
                    // this.$store.dispatch('logout')
                }
            })
        },
        gotoAuth() {
            this.$router.push({
                path: '/auth'
            })
        }
    },
    computed: {
        isLogin() {
            return localStorage.access_token
        }
    }
}
</script>