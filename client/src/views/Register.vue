<template>
    <div class="register" style="height : 100vh">
        <h1 class="p-5" style="color : white; background-color : black; opacity : 50%">Motorcycle Build and Repair</h1>
        <div class="m-5" style="display: flex; flex-direction:row; justify-content : center; align-content : center; align-items : center; flex-wrap : nowrap">
            <div class="card" style="opacity:70%; background-color: black">
                <h1 style="color : white" class="mt-3">Register</h1>
                <form @submit.prevent="register" class="ml-3 mr-3 mb-4 mt-2 p-3">
                    <div class="form-group">
                        <label for="name_register" style="color : white">Name :</label>
                        <input style="color : black" type="name" class="form-control" v-model="name_register" required>
                    </div>
                    <div class="form-group">
                        <label for="email_register" style="color : white">Email address :</label>
                        <input style="color : black" type="email" class="form-control" v-model="email_register" required>
                    </div>
                    <div class="form-group">
                        <label for="password_register" style="color : white">Password :</label>
                        <input style="color : black" type="password" class="form-control" v-model="password_register" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password_register" style="color : white">Confirm Password :</label>
                        <input style="color : black" type="password" class="form-control" v-model="confirm_password_register" required>
                    </div>
                    <button type="submit" class="btn btn-warning mb-1">Register</button><br>
                    <a @click="login" href="">Already have an account ? Login</a>
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
            name_register : null,
            email_register : null,
            password_register : null,
            confirm_password_register : null
        }
    },
    methods : {
        register() {
            if(this.password_register === this.confirm_password_register){
                axios({
                    method : 'post',
                    url : `${url}/users/registeruser`,
                    data : {
                        name : this.name_register,
                        email : this.email_register,
                        password : this.password_register
                    }
                })
                .then(data=>{
                    let timerInterval
                    // localStorage.setItem('token', data.data.access_token)
                    this.$router.push({
                        path : '/'
                    })
                    Swal.fire({
                    title: `Welcome, ${data.data.name}`,
                    timer: 2000,
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
                        console.log('register Success')
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
                    // console.log(err.response.data.message)
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong password',
                    timer: 2500,
                    text: `Check your password again`
                })
            }
        },
        login(){
            this.$router.push({
                path : '/login'
            })
        }
    },
}
</script>

<style scoped>
.register{
    background-image: url('../assets/login.jpg');
    background-size: cover;
    background-position: center
}
</style>