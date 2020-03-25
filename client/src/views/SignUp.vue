<template>
    <b-container>
        <b-row>
            <b-col sm="3"></b-col>
            <b-col sm="6">
                <h2 class="font-weight-bold mb-3">Sign Up</h2>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group  label="Email address:">
                        <b-form-input placeholder="Enter your email" type="email" v-model="form.email" required></b-form-input>
                    </b-form-group>
                     <b-form-group  label="Username:">
                        <b-form-input placeholder="Enter your username" type="text" v-model="form.username" required></b-form-input>
                    </b-form-group>
                      <b-form-group  label="Name:">
                        <b-form-input placeholder="Enter your name" type="text" v-model="form.name" required></b-form-input>
                    </b-form-group>
                    <b-form-group  label="Password:">
                        <b-form-input placeholder="Enter your password" type="password" v-model="form.password" required></b-form-input>
                    </b-form-group>
                    <button class="btn btn-success" :disabled="isLoading">Submit</button>
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
                password:'',
                username:'',
                name:''
            }
        }
    },
    computed:mapGetters(['isLoading']),
    methods:{
        onSubmit(){
            var self=this;
            this.signUp(this.form)
            .then((result)=>{
                console.log({result})
                if(result.err===0)
                    self.$router.push('/login')
                else{
                    var listErrors=result.error.response.data.errors;
                    console.log(listErrors)
                    self.$bvModal.msgBoxOk('Sign Up Failed: '+listErrors.join(','))
                }
            })
           
        },
         ...mapActions(['signUp'])
    },
    name:'SignUp'
}
</script>