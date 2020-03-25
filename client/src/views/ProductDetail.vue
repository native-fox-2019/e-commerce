<template>
    <b-container>
        <Loading v-if="isLoading"/>
        <b-row v-if="product!==null">
            <b-col sm="4">
                <img :src="$store.state.IMG_SERVER+product.image_url" alt="" class="product-image mb-4">
                <button class="btn btn-success" @click="showCartModal">Add to cart</button>
            </b-col>
            <b-col sm="8">
                <h2 class="font-weight-bold mb-5">{{product.name}}</h2>
                <b-row>
                    <b-col sm="3">
                        <h3>Stock</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>{{product.stock}}</p>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <h3>Price</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>{{product.price}}</p>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <h3>Category</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>{{product.category}}</p>
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <b-col sm="12">
                        <p class="text-left">{{product.description}}</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
         <b-modal v-if="product" id="bv-modal-cart" :no-close-on-backdrop="true" hide-footer>
            <template v-slot:modal-title>
                Add To card
            </template>
            <div class="d-block text-center">
                <form ref="formCart" >
                     <b-form-group invalid-feedback="Num of stock is required">
                        <b-form-input :max="product.stock" min="0" placeholder="Enter number of stock" type="number" v-model="numStock" :state="numStockState" required></b-form-input>
                    </b-form-group>
                </form>
               
                <button class="btn btn-primary" @click="handleSubmitCart">Add To cart</button>
            </div>
        </b-modal>
    </b-container>
    
</template>
<script>
import Loading from '../components/Loading'


export default {
    name:'ProductDetail',
    data(){
        return {
            numStockState:null,
            numStock:0,
            product:null
        }
    },
    computed:{
        isLoading(){
            return this.$store.getters.isLoading
        },
        stockInCart(){
            var id=this.product.id
            var listP=this.$store.state.cart.filter((c)=>c.id===id).reduce((prev,curr)=>prev+Number(curr.stock),0)
            return listP
        }
    },
    created(){
        var id=this.$route.params.id
        var self=this;
        this.$store.dispatch('getProductById',id)
        .then((data)=>{
            self.product=data
            self.product.stock-=this.stockInCart
        })
    },
    methods:{
        showCartModal(){
            this.$bvModal.show('bv-modal-cart')
        },
        handleSubmitCart(){
            var formCart=this.$refs.formCart;
            this.numStockState=null;
            if(!formCart.checkValidity() || this.numStock===0 ){
                this.numStockState=false;
                return;
            }
            this.$nextTick(() => {
                this.$bvModal.hide('bv-modal-cart')
                this.product.stock=this.numStock
                this.$store.dispatch('addToCart',this.product)
                this.$router.push('/cart')
            })
        }
    },
    components:{
        Loading
    }
}
</script>

<style scoped>
    .product-image{
        width: 100%;
        height: 300px;
    }
</style>