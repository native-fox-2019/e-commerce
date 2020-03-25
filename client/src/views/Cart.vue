<template>
    <b-container>
        <h1>Current Cart</h1>
        <b-row class="mt-5 cart-content"  v-for="i in [1,2,3,4]" :key="i">
            <b-col sm="3">
                <img src="/sepatu.jpg" alt="" class="product-image mb-4">
            </b-col>
            <b-col sm="9">
                <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Name</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>Sepatu Haha</p>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Stock</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>4</p>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col sm="4">
                        <h6 class="font-weight-bold">Price</h6>
                    </b-col>
                    <b-col sm="8">
                        <p>100,000</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <button class="btn btn-primary mt-4 mb-4" >Checkout</button>
    </b-container>
</template>

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