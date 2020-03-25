<template>
    <b-container>
        <b-row>
            <b-col sm="3">
                <b-list-group>
                    <b-list-group-item href="#">All</b-list-group-item>
                    <b-list-group-item href="#">Gym</b-list-group-item>
                    <b-list-group-item href="#">Lifestyle</b-list-group-item>
                    <b-list-group-item href="#">Hehe</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col sm="9">
                <Loading v-if="isLoading"/>
                <div v-else>
                    <b-row>
                        <ProductCard v-for="product in products" :key="product.id" :product="product" />
                    </b-row>
                    <b-row class="justify-content-md-center mb-5">
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
            products:[]
        }
    },
    created(){
        let category=this.$route.query.category;
        var self=this
        if(category){
            console.log('This is form category')
        }
        else{
            this.$store.dispatch('loadHomeProducts')
            .then((data)=>{
                self.products=data
            })
        }
    },
    computed:mapGetters(['isLoading']),
    components:{
        Loading,
        ProductCard
    }
}
</script>