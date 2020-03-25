<template>
    <b-container>
        <b-row>
            <b-col sm="3">
                <b-list-group>
                    <b-list-group-item href="#" :active="!category" @click="toPage('')">All</b-list-group-item>
                    <b-list-group-item href="#" :active="category==='gym'" @click="toPage('gym')">Gym</b-list-group-item>
                    <b-list-group-item href="#" :active="category==='lifestyle'" @click="toPage('lifestyle')">Lifestyle</b-list-group-item>
                    <b-list-group-item href="#" :active="category==='soccer'" @click="toPage('soccer')">Soccer</b-list-group-item>
                     <b-list-group-item href="#" :active="category==='basketball'" @click="toPage('basketball')">Basketball</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col sm="9">
                <Loading v-if="isLoading"/>
                <div v-else>
                    <b-row>
                        <ProductCard v-for="product in products" :key="product.id" :product="product" />
                    </b-row>
                    <b-row v-if="products.length" class="justify-content-md-center mb-5">
                        <a href="">View more product</a> 
                    </b-row>
                </div>

            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import {mapGetters} from 'vuex'

export default {
    name:'Product',
    data(){
        return {
            products:[],
            category:''
        }
    },
    created(){
        let category=this.$route.query.category;
        let search=this.$route.query.search;
        this.loadProduct(search?search:category,search?true:false)
    },
    computed:mapGetters(['isLoading']),
    methods:{
        toPage(category){
            this.$router.push('/product?category='+category)
            this.loadProduct(category)
        },
        loadProduct(input,isSearch){
            var self=this
            this.products=[];
            if(isSearch){
                this.$store.dispatch('loadProductsBySearch',input)
                .then((data)=>{
                    self.products=data
                })
                return;
            }

            if(input){
                this.$store.dispatch('loadProductsByCategory',input)
                .then((data)=>{
                    self.products=data
                })
            }
            else{
                this.$store.dispatch('loadHomeProducts')
                .then((data)=>{
                    self.products=data
                })
            }
            this.category=input
        }
    },
    components:{
        Loading,
        ProductCard
    }
}
</script>