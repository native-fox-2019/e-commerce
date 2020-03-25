<template>
    <b-container>
        <b-row>
            <b-col sm="3"></b-col>
            <b-col sm="6">
                <h2 class="font-weight-bold mb-3">Login</h2>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group  label="Email address:">
                        <b-form-input placeholder="Enter your email" type="email" v-model="form.email" required></b-form-input>
                    </b-form-group>
                    <b-form-group  label="Password:">
                        <b-form-input placeholder="Enter your password" type="password" v-model="form.password" required></b-form-input>
                    </b-form-group>
                    <button class="btn btn-success" :disabled="isLoading">Submit</button>
                    <router-link to="/sign-up" class="ml-3">Does have any account? click here to sign-up</router-link>
                </b-form>
            </b-col>
        </b-row>

    </b-container>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    data(){
        return {
            form:{
                email:'',
                password:''
            }
        }
    },
    computed:mapGetters(['isLoading']),
    methods:{
        onSubmit(){
            this.login(this.form)
            this.$router.push({name:'Home'})
            
        },
        ...mapActions(['login'])
    },
    name:'Login'
}
</script>