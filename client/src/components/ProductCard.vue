<template>
    <div class="card" style="height: 37rem">
        <div class="card-body">
            <img style="width: 70%; height: 62%" :src= data.image_url class="card-img-top border border-darken-1" :alt= data.name>
            <h5 class="card-title mt-2">{{data.name}}</h5>
            <h5 class="card-text">Rp.{{data.price.toLocaleString()}}</h5>
            <p>Quantity:</p>
            <p>{{data.stock}}</p>
            <div>
                <button @click="addToCart(data.id)" class="btn btn-info">Add to cart</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    props: ['data'],
    methods:{
        addToCart(id){
            if(!localStorage.getItem('token')){
                this.$bvModal.show('modal-login')
            }else{
                axios({
                    method: 'post',
                    url: `${this.$store.state.url}/products/addCart/${id}`,
                    headers: {token: localStorage.getItem('token')}
                })
                    .then(res=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500
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