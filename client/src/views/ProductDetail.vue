<template>
    <div class="product-detail">
        <div class="container">
            <div class="image">
                <img v-bind:src="$store.state.product_temp.image_url" />
            </div>
            <div class="action">
                <h4 class="title">{{ product_temp.name }}</h4>
                <div class="seller-name">
                    <p>Seller: {{ product_temp.seller_name }}</p>
                </div>
                <div class="stockprice">
                    <p>Stock: {{ product_temp.stock }}</p>
                    <p>Price: {{ product_temp.price }} IDR</p>
                </div>
                <div class="add-cart" v-on:click="toggleAddCart">
                    +
                </div>
                <div class="quantitiy" v-if="showAddCart">
                    <label>Quantity: </label>
                    <input type="number" v-model="qty" /><br />
                    <button class="btn-add" v-on:click="addToCart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import {mapState} from 'vuex';
export default {
    name: 'ProductDetail',
    data() {
        return {
            showAddCart: false,
            qty: 1
        };
    },
    methods: {
        toggleAddCart: function() {
            this.showAddCart = !this.showAddCart;
        },
        addToCart: function() {
            if (this.qty <= this.product_temp.stock) {
                this.$store.state.cart.push({
                    id: this.$store.state.cart.length + 1,
                    product_id: this.product_temp.id,
                    seller_id: this.product_temp.user_id,
                    qty: Number(this.qty),
                    price: this.product_temp.price,
                    product_name: this.product_temp.name
                });
                this.qty = 1;
                this.showAddCart = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart',
                    text: `${this.product_temp.name} successfully added to your cart!`
                });
            } else {
                this.$store.dispatch('errorHandler', {
                    data: {
                        message: "Can't buy a product that exceeds its stock"
                    }
                });
            }
        }
    },
    computed: {
        ...mapState(['product_temp'])
    }
};
</script>
