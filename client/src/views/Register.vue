<template>
   <div class="container">
        <div class="img">
            
        </div>
        <div class="login-content">
            <form v-on:submit.prevent="register">

                <h2 class="title">Register</h2>
                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                        <input type="text" placeholder="First Name" v-model="input_firstname">
                    </div>
                </div>
                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                        <input type="text" placeholder="Last Name" v-model="input_lastname">
                    </div>
                </div>
                <div class="input-div one">
                    <div class="i">
                     <i class="fas fa-paper-plane"></i>
                    </div>
                    <div class="div">
                        <input type="text" placeholder="Email" v-model="input_email">
                    </div>
                </div>
                <div class="input-div pass">
                    <div class="i">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                        <input type="password" placeholder="Password" v-model="input_password">
                    </div>
                </div>
                 <router-link to="/login">back to Login</router-link>
                <input type="submit" class="btn" value="Register">
            </form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import url from '../../config/config'   
import Swal from "sweetalert2"
export default Vue.extend ({
    name : 'Register',
    data () {
        return {
            input_firstname : "",
            input_lastname : "",
            input_email : "",
            input_password : ""
        }
    },
    methods : {
        register() {
            axios({
                    url : `${url}/user/register`,
                    method : 'POST',
                    data : {
                    first_name: this.input_firstname,
                    last_name:this.input_lastname,
                    email : this.input_email,
                    password : this.input_password
                     }
                })
                .then(data => {
                    this.$router.push({path : '/login'})
                    Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Hey ${data.data.first_name} ${data.data.last_name}, you just need to login`,
                    showConfirmButton: false,
                    timer: 3000
                    })
                })
                .catch(err => {
                    const msg = err.response.data.message.join(', ')
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${msg}`,
                    footer: 'app made by love 💖'
                        });
                })
                
        }
    }
})
</script>

<style scoped>

body {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
}

.login-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
}

.img img {
    width: 500px;
}

form {
    width: 360px;
}

.login-content img {
    height: 100px;
}

.login-content h2 {
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;
}

.login-content .input-div {
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one {
    margin-top: 0;
}

.i {
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.i i {
    transition: .3s;
}

.input-div>div {
    position: relative;
    height: 45px;
}

.input-div>div>h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: .3s;
}

.input-div:before,
.input-div:after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: #38d39f;
    transition: .4s;
}

.input-div:before {
    right: 50%;
}

.input-div:after {
    left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
    width: 50%;
}

.input-div.focus>div>h5 {
    top: -5px;
    font-size: 15px;
}

.input-div.focus>.i>i {
    color: #38d39f;
}

.input-div>div>input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'poppins', sans-serif;
}

.input-div.pass {
    margin-bottom: 4px;
}

a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: .3s;
}

a:hover {
    color: #38d39f;
}

.btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, cadetblue, #38d39f, cadetblue);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: .5s;
}

.btn:hover {
    background-position: right;
}

@media screen and (max-width: 1050px) {
    .container {
        grid-gap: 5rem;
    }
}

@media screen and (max-width: 1000px) {
    form {
        width: 290px;
    }
    .login-content h2 {
        font-size: 2.4rem;
        margin: 8px 0;
    }
    .img img {
        width: 400px;
    }
}

@media screen and (max-width: 900px) {
    .container {
        grid-template-columns: 1fr;
    }
    .img {
        display: none;
    }
    .wave {
        display: none;
    }
    .login-content {
        justify-content: center;
    }
}

</style>