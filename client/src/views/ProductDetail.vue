<template>
    <b-container>
        <b-row>
            <b-col sm="4">
                <img src="/sepatu.jpg" alt="" class="product-image mb-4">
                <button class="btn btn-success" @click="showCartModal">Add to cart</button>
            </b-col>
            <b-col sm="8">
                <h2 class="font-weight-bold mb-5">Sepatu Haha</h2>
                <b-row>
                    <b-col sm="3">
                        <h3>Stock</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>10</p>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <h3>Price</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>10,000</p>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <h3>Category</h3>
                    </b-col>
                    <b-col sm="9">
                        <p>gym</p>
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio repellat quidem quae ipsa accusantium aliquid numquam vero facilis minima quos vitae quis nam odit, molestias fugit ex, dolor, debitis tenetur.</p>
                </b-row>
            </b-col>
        </b-row>
         <b-modal id="bv-modal-cart" :no-close-on-backdrop="true" hide-footer>
            <template v-slot:modal-title>
                Add To card
            </template>
            <div class="d-block text-center">
                <form ref="formCart" >
                     <b-form-group invalid-feedback="Num of stock is required">
                        <b-form-input placeholder="Enter number of stock" type="number" v-model="numStock" :state="numStockState" required></b-form-input>
                    </b-form-group>
                </form>
               
                <button class="btn btn-primary" @click="handleSubmitCart">Add To cart</button>
            </div>
        </b-modal>
    </b-container>
    
</template>
<script>
export default {
    name:'ProductDetail',
    data(){
        return {
            numStockState:null,
            numStock:0
        }
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
                this.$router.push('/cart')
            })
        }
    }
}
</script>

<style scoped>
    .product-image{
        width: 100%;
        height: 300px;
    }
</style>