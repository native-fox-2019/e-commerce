<template>
    <b-container>
        <b-row>
            <b-col sm="3"></b-col>
            <b-col sm="6">
                <h2 class="font-weight-bold mb-3">Update Profile</h2>
                <b-form @submit.prevent="updateProfile">
                    <b-form-group  label="Email address:">
                        <b-form-input placeholder="Enter your email" type="email" v-model="form.email"></b-form-input>
                    </b-form-group>
                     <b-form-group  label="Username:">
                        <b-form-input placeholder="Enter your username" type="text" v-model="form.username"></b-form-input>
                    </b-form-group>
                      <b-form-group  label="Name:">
                        <b-form-input placeholder="Enter your name" type="text" v-model="form.name"></b-form-input>
                    </b-form-group>
                    <b-form-group  label="Password:">
                        <b-form-input placeholder="Enter your password" type="password" v-model="form.password"></b-form-input>
                    </b-form-group>
                    <button class="btn btn-success" :disabled="isLoading">Submit</button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'Profile',
    data(){
        return {
            form:{}
        }
    },
    computed:mapGetters(['isLoading']),
    methods:{
        updateProfile(){
            this.$store.dispatch('updateProfile',this.form)
            .then((result)=>{
                if(result.error===0)
                    this.$router.push('/')
            })
        }
    }
}
</script>