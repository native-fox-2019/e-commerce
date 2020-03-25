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
                    <b-row v-if="products.length && !emptyResult" class="justify-content-md-center mb-5">
                        <a href="#" @click.prevent="loadMore">View more product</a> 
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

var vm=null;

export default {
    name:'Product',
    data(){
        return {
            products:[],
            category:'',
            currPage:1,
            isSearch:false,
            emptyResult:false
        }
    },
    created(){
        let category=this.$route.query.category;
        let search=this.$route.query.search;
        if(search)
            this.isSearch=true
        this.loadProduct(search?search:category,this.isSearch)
        vm=this
    },
    computed:{
        searchText(){
            return this.$store.state.searchText
        },
        ...mapGetters(['isLoading'])
    },
    watch:{
        searchText:(oldVal,newVal)=>{
            if(vm){
                vm.loadProduct(newVal,vm.isSearch)
            }
        }
    },
    methods:{
        onLoaded(appended){
            var self=this;
            return (data)=>{
                if(!appended)
                    self.products=data
                else{
                    self.products.concat(data)
                    if(data.length===0)
                        self.emptyResult=true
                }
            }
        },
        loadMore(){
            this.currPage++;
            this.loadProduct(this.category,this.isSearch,true)
        },
        toPage(category){
            this.$router.push('/product?category='+category)
            this.loadProduct(category)
        },
        loadProduct(input,isSearch,appended){
            if(!appended)
                this.products=[];
            if(isSearch){
                this.$store.dispatch('loadProductsBySearch',input)
                .then(this.onLoaded(appended))
                return;
            }

            if(input){
                this.$store.dispatch('loadProductsByCategory',input)
                .then((this.onLoaded(appended)))
            }
            else{
                this.$store.dispatch('loadHomeProducts',this.currPage)
                .then(this.onLoaded(appended))
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