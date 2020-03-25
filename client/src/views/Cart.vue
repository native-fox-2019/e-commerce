<template>
    <div class="cart-page">
        <h4 class="page-title">My Cart</h4>
        <div class="cart-table">
            <table cellpadding="10px">
                <thead>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.qty }}</td>
                        <td>{{ Number(item.price) * Number(item.qty) }} IDR</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="user-info">
            <input
                type="text"
                v-model="phone_number"
                placeholder="Phone Number"
            /><br />
            <textarea
                cols="30"
                rows="5"
                v-model="address"
                placeholder="Shipping Address"
            ></textarea>
        </div>
        <div class="button-div">
            <button class="btn checkout-btn" v-on:click="checkout">
                Checkout
            </button>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import axios from 'axios';
export default {
    name: 'Cart',
    data() {
        return {
            phone_number: '',
            address: ''
        };
    },
    methods: {
        checkout: function() {
            if (this.cart.length != 0) {
                if (this.phone_number !== '' || this.address !== '') {
                    let data_send = [];
                    this.cart.forEach(element => {
                        data_send.push({
                            product_id: element.product_id,
                            seller_id: element.seller_id,
                            address: this.address,
                            phone: this.phone_number,
                            qty: element.qty
                        });
                    });
                    this.address = '';
                    this.phone_number = '';
                    axios({
                        method: 'post',
                        url: `${this.$store.state.rootUrl}/order`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: data_send
                    })
                        .then(result => {
                            this.$store.state.cart = [];
                            this.$store.dispatch('messageHandler', {
                                data: {
                                    message: `Your Order Successfully Created! Your order code: ${result.data.order_code}`
                                }
                            });
                        })
                        .catch(err => {
                            this.$store.dispatch('errorHandler', err.response);
                        });
                } else {
                    this.$store.dispatch('errorHandler', {
                        data: {
                            message:
                                'Please fill your contact number and shipping address'
                        }
                    });
                }
            } else {
                this.$store.dispatch('errorHandler', {
                    data: {
                        message: 'Your Cart is Empty'
                    }
                });
            }
        }
    },
    computed: {
        ...mapState(['cart'])
    }
};
</script>
