<template>
    <div>
        <div class="container">
            <h1>My Shopping Cart</h1>
            <table class="table border border-navy">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in dataCart" :key="data.index">
                    <td>{{data.name}}</td>
                    <td>Rp.{{data.price.toLocaleString()}}</td>
                    <td><input v-model="quantity[Number(data.id)]" type="number" min="1"></td>
                    <td>
                        <button @click="checkout(data.id, data.stock)" class="btn btn-success mr-3">Checkout</button>
                        <button @click="removeProduct(data.id)" class="btn btn-danger">Remove</button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
            quantity: {}
        }
    },
    created(){
        this.$store.dispatch('getDataCart')
    },
    computed: mapState([
        'dataCart'
    ]),
    methods:{
        removeProduct(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to remove this item from your cart?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove this item'
            })
            .then((result)=> {
                if(result.value){
                    axios({
                        method: 'delete',
                        url: `${this.$store.state.url}/products/cart/${id}`,
                        headers: {token: localStorage.getItem('token')}
                    })
                        .then(()=>{
                            this.$store.dispatch('getDataCart')
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }
            })

        },

        checkout(id, stock){

            if(Number(this.quantity[id]) > stock){
                Swal.fire({
                    icon: 'error',
                    title: `Maximum quantity is ${stock}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(!Number(this.quantity[id])){
                Swal.fire({
                    icon: 'error',
                    title: 'Please input the quantity',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                axios({
                    method: 'put',
                    url: `${this.$store.state.url}/products/checkout/${id}`,
                    headers: {token: localStorage.getItem('token')},
                    data: {
                        stock: Number(this.quantity[id])
                    }
                })
                    .then(res=>{

                        Swal.fire({
                            icon: 'success',
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })

                        this.$router.push({
                            path: '/'
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        }
    }
}
</script>