<template>
    <b-container>
        <h1>Current Cart</h1>
        <h3 v-if="cart.length===0" class="mt-5">Your cart is empty</h3>
        <div v-else>
             <b-row class="mt-5 cart-content"  v-for="(c,index) in cart" :key="index">
            <b-col sm="3">
                <img :src="imageURL(c)" alt="" class="product-image mb-4">
            </b-col>
            <b-col sm="9">
                <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Name</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>{{c.name}}</p>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Stock</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>{{c.stock}}</p>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Price</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>{{c.price}}</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <button class="btn btn-primary mt-4 mb-4" @click="checkout">Checkout</button>
        </div>
       
    </b-container>
</template>
<script>
import {imageURL} from '../helpers/img'

export default {
    name:'Cart',
    computed:{
        isLogin(){
            return this.$store.state._isLogin
        },
        cart(){
            return this.$store.state.cart
        }
    },
    methods:{
        checkout(){
            if(this.isLogin){
                this.$bvModal.msgBoxConfirm('Are you sure want to checkout?')
                .then((result)=>{
                    if(result){
                        this.$store.dispatch('emptyCart')
                    }
                })
            }
            else{
                this.$bvModal.msgBoxOk('You must login to continue',{
                    'no-close-on-backdrop':true
                })
                .then(()=>{
                    this.$router.push({name:'Login'})
                })
            }
        },
        imageURL
    }
    
}
</script>
<style scoped>
    .product-image{
        width: 100%;
        height: 200px;
    }

    .cart-content{
        border-bottom: 1px solid lightgray;
    }

    .cart-content:last-child{
        border-bottom: none;
    }
</style>