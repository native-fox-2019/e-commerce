<template>
    <div class="cart" style="height : 100vh">
    <Navbar />
    <h1 style="color : white; padding-top : 5%" class="nav-link" id="productlist">Your Cart</h1>
    <div class="container overflow-auto" style="max-height : 70vh">
    <table class="table table-striped">
        <thead class="thead-clear" style="color : yellow">
            <tr>
            <th scope="col">No</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Edit</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody style="color : white; font-size : 25px; background-color : black; opacity : 80%" v-for="(item, index) in cart" :key="item.id">
            <tr>
            <th scope="row">{{index += 1}}</th>
            <td>{{item.name}}</td>
            <td>{{item.Cart.amount}}</td>
            <button style="color:white; font-size : 30px" class="btn btn-clear p-1" @click.prevent="plusOne(item.Cart.ProductId, item.Cart.amount, item.Cart.total)">+</button> ||
            <button style="color:white; font-size : 30px" class="btn btn-clear p-1" @click.prevent="minusOne(item.Cart.ProductId, item.Cart.amount, item.Cart.total)">-</button>
            <td style="text-align : right">Rp. {{item.Cart.total.toLocaleString()}}</td>
            <button @click.prevent="deleteCart(item.Cart.ProductId, item.name)" class="btn btn-danger p-1" style="margin-top : 13px">Delete</button> || <button @click.prevent="buyCart(item.Cart.ProductId, item.name, item.Cart.amount)" class="btn btn-warning p-1" style="margin-top : 13px">Buy</button>
            </tr>
        </tbody>
    </table>
    </div>
    <h3 style="background-color:black; color : yellow; text-align:right; opacity:80%" class="nav-link ml-5 mr-5 mt-3" id="productlist">Total on Cart: Rp. {{totalCart.toLocaleString()}}</h3>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
// let url = `http://localhost:3000`
let url = 'https://powerful-meadow-02119.herokuapp.com'
export default {
    computed : mapState(['cart', 'totalCart']),
    components : {
        Navbar
    },
    data () {
        return {

        }
    },
    methods : {
        deleteCart(ProductId, name){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                if (result.value) {
                    Swal.fire({
                    title : 'Deleted!',
                    timer: 2000,
                    text : `Item ${name} has been deleted.`
                    })
                    return axios({
                        method : 'delete',
                        url : `${url}/cart/deletecart/${ProductId}`,
                        headers : {
                            access_token : localStorage.getItem('token')
                        }
                    })
                }
            })
            .then(()=>{
                this.$store.dispatch('getCart')
            })
            .catch(err=> {
                console.log(err)
            })
        },
        buyCart(productId, name, amount){
            Swal.fire({
                title: 'Are you sure?',
                text: `You will buy ${amount} ${name}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Buy'
                }).then((result) => {
                if (result.value) {
                    axios({
                        method : 'post',
                        url : `${url}/cart/finddelete/${productId}`,
                        headers : {
                            access_token : localStorage.getItem('token')
                        },
                        data : {
                            amount : amount
                        }
                    }).then(()=>{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Your order, ${name} has been placed, we will contact you soon`,
                            showConfirmButton: false,
                        })
                        this.$store.dispatch('getCart')
                    })
                    .catch(err=>{
                        Swal.fire({
                        icon: 'error',
                        title: `${err.response.data.message}`,
                        text: 'Try again later or call our call center at (021)1500354',
                    })
                    })
                }
            })
        },
        plusOne(productId, amount, total){
            axios({
                method : 'put',
                url : `${url}/cart/editplus/${productId}`,
                data : {
                    amount : amount,
                    price : total / amount
                },
                headers : {
                    access_token : localStorage.getItem('token')
                }
            }).then(()=>{
                this.$store.dispatch('getCart')
            })
            .catch(err=>{
                console.log(err)
            })
        },
        minusOne(productId, amount, total){
            axios({
                method : 'put',
                url : `${url}/cart/editminus/${productId}`,
                data : {
                    amount : amount,
                    price : total / amount
                },
                headers : {
                    access_token : localStorage.getItem('token')
                }
            }).then(()=>{
                this.$store.dispatch('getCart')
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.data.message}`,
                    // text: 'Try again later or call our call center at (021)1500354',
                })
            })
        }
    },
    created () {
        this.$store.dispatch('getCart')
    }
}
</script>

<style scoped>
.cart{
    background-image: url('../assets/home.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center
}
</style>