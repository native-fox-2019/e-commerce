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
                <Loading v-if="products.length===0 && isLoading"/>
                <div v-else>
                    <b-row>
                        <ProductCard v-for="(product,index) in products" :key="index" :product="product" />
                    </b-row>
                    <b-row v-if="products.length && !emptyResult && !isLoading" class="justify-content-md-center mb-5">
                        <a href="#" :disabled="true" @click.prevent="loadMore">View more product</a> 
                    </b-row>
                </div>

            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'

var vm=null;

export default {
    name:'Product',
    data(){
        return {
            PRODUCT:[],
            category:'',
            currPage:1,
            isSearch:false,
            emptyResult:false,
            SEARCHTEXT:''
        }
    },
    created(){
        var search=this.getInputType()
        this.loadProduct(search,this.isSearch)
        vm=this
    },
    computed:{
        searchText(){
            return this.$store.state.searchText
        },
        isLoading(){
            return this.$store.getters.isLoading
        },
        products(){
            return this.PRODUCT
        }
    },
    watch:{
        searchText:(val)=>{
            if(vm){
                vm.loadProduct(val,true)
                vm.SEARCHTEXT=val
                vm.currPage=1
            }
        }
    },
    methods:{
        onLoaded(appended){
            var self=this;
            return (data)=>{
                if(!appended)
                    self.PRODUCT=data
                else{
                    for(var i=0;i<data.length;i++){
                        self.PRODUCT.push(data[i])
                    }
                    if(data.length===0)
                        self.emptyResult=true
                }
            }
        },

        getInputType(){
            let category=this.$route.query.category;
            let search=this.$route.query.search;
            if(search)
                this.isSearch=true
            return search?this.SEARCHTEXT:category
        },
        loadMore(){
            this.currPage++;
            var search=this.getInputType()
            this.loadProduct(search,this.isSearch,true)
        },
        toPage(category){
            this.$router.push('/product?category='+category)
            this.emptyResult=false
            this.currPage=1
            this.isSearch=false
            this.loadProduct(category)
        },
        loadProduct(input,isSearch,appended){
            if(!appended){
                this.PRODUCT=[];
            }
            var input_;
            if(!appended)
                input_=input
            else{
                input_={}
                input_.search=input
                input_.page=this.currPage
            }

            if(isSearch){
                this.$store.dispatch('loadProductsBySearch',input_)
                .then(this.onLoaded(appended))
                return;
            }

            if(input){
                this.$store.dispatch('loadProductsByCategory',input_)
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