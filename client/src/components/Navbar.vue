<template>
<div>
    <div class="d-flex flex-row bd-highlight mb-3 justify-content-between bg-dark">
        <div class="m-1 flex-grow-1 text-center">
            <h1 class="text-light">Oldie Music</h1>
        </div>
            
        <div class="p-2 m-1 bd-highlight">
            <button @click="home" class="btn btn-secondary ml-2">Home</button>
            <button v-if= logedIn @click="showCart" class="btn btn-info ml-2">Cart</button>
            <button v-if= logedIn @click="logout" class="btn btn-danger ml-2">Logout</button>
            <button v-if= notLogin v-b-modal.modal-login class="btn btn-primary ml-2">Login</button>
            <button v-if= notLogin v-b-modal.modal-register class="btn btn-info ml-2">Register</button>
        </div>
    </div>
</div>    
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'notLogin',
        'logedIn'
    ]),
    methods: {
        logout(){
            this.$store.dispatch('logoutState')
            this.$router.push({
                path: '/'
            })
        },

        showCart(){
            this.$router.push({
                path: '/cart'
            })
        },
        home(){
            this.$router.push({
                path: '/'
            })
        }
    }
}
</script>