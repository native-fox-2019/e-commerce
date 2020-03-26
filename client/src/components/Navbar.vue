<template>
    <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color : black; opacity : 70%">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a @click.prevent="home" class="nav-item nav-link active btn" href="" style="color : yellow;  font-size : 20px">Home</a>
                </div>
                <a @click.prevent="plist" class="nav link" style="color : yellow; font-size : 20px;" href=""> Product List </a>
            </div>
            <a v-if="token" class="mr-3" style="color:white; font-size : 20px">Hello, {{name}}</a>
            <button v-if="token" @click.prevent="cart" class="btn btn-info mr-2" href="" style="color : white; font-size : 20px">Cart</button>
            <button v-if="token" @click.prevent="logout" class="btn btn-success" style="color : white; font-size : 20px">Logout</button>
            <button v-if="!token" @click.prevent="login" class="btn btn-primary" style="color : white; font-size : 20px">Login</button>
            <i class="fas fa-shopping-cart"></i>
        </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data () {
        return {
            token : localStorage.getItem('token'),
            name : localStorage.getItem('name')
        }
    },
    methods : {
        plist(){
            this.$router.push({
                path : '/productlist'
            })
        },
        home(){
            this.$router.push({
                path : '/'
            })
        },
        logout(){
            Swal.fire({
            title: 'Are you sure want to Logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, sure!'
            })
            .then((result) => {
                if (result.value) {
                    localStorage.removeItem('token')
                    this.$router.push({
                        path : '/'
                    })
                    Swal.fire({
                    title : `See you, ${localStorage.getItem('name')}`,
                    timer: 2000,
                    })
                    localStorage.removeItem('name')
                }
            })
        },
        cart(){
            this.$router.push({
                path : '/cart'
            })
        },
        login(){
            this.$router.push({
                path : '/login'
            })
        }
    }
}
</script>