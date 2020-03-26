<template>
    <div class="login" style="height : 100vh">
    <h1 class="p-2" style="color : white; background-color : black; opacity : 50%">Motorcycle Build and Repair</h1>
    <img class="img mt-0 p-0" alt="" src="../assets/logo.png" style="width : 15%;">
        <div class="m-5" style="display: flex; flex-direction:row; justify-content : center; align-content : center; align-items : center; flex-wrap : nowrap">
            <div class="card" style="opacity:70%; background-color: black">
                <h1 style="color : white" class="mt-3">Login</h1>
                <form @submit.prevent="login" class="ml-3 mr-3 mb-4 mt-2 p-3">
                    <div class="form-group">
                        <label for="email_login" style="color : white">Email address :</label>
                        <input style="color : black" type="email" class="form-control" v-model="email_login" required>
                    </div>
                    <div class="form-group">
                        <label for="password_login" style="color : white">Password :</label>
                        <input style="color : black" type="password" class="form-control" v-model="password_login" required>
                    </div>
                    <button type="submit" class="btn btn-warning mb-1">Login</button><br>
                    <a @click.prevent="register" href="">Don't have an account ? Register</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
let url = `http://localhost:3000`
export default {
    data () {
        return {
            email_login : null,
            password_login : null
        }
    },
    methods : {
        login() {
            axios({
                method : 'post',
                url : `${url}/users/loginuser`,
                data : {
                    email : this.email_login,
                    password : this.password_login
                }
            })
            .then(data=>{
                let timerInterval
                localStorage.setItem('token', data.data.access_token)
                localStorage.setItem('name', data.data.name)
                this.$router.push({
                    path : '/'
                })
                Swal.fire({
                title: `Welcome back, ${data.data.name}`,
                text: `Please Wait`,
                timer: 4000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                        b.textContent = Swal.getTimerLeft()
                        }
                    }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('Login Success')
                }
                })
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    timer: 2000,
                    text: `${err.response.data.message}`
                })
            })
        },
        register(){
            this.$router.push({
                path : '/register'
            })
        }
    },
}
</script>

<style scoped>
.login{
    background-image: url('../assets/login.jpg');
    background-size: cover;
    background-position: center
}
.img { 
  filter: invert(100%); 
  -webkit-filter:red(80%); 
  } 
</style>