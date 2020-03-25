<template>
    <div class="order-page">
        <div class="order-container">
            <h4 class="title">My Order</h4>

            <div
                class="order-list"
                v-for="order in orders"
                :key="order.order_code"
            >
                <OrderCard
                    v-bind:order="order"
                    v-on:openOrderDetailModal="openOrderDetailModal($event)"
                ></OrderCard>
            </div>
        </div>
        <transition name="bounce">
            <div class="orderDetailModal modal" v-if="orderDetailModal">
                <div class="modal-content">
                    <div class="x" v-on:click="closeOrderDetailModal">+</div>

                    <div class="box-title">
                        <h4 class="OD-title">Code: {{ selectedOrderCOde }}</h4>
                    </div>
                    <div class="detail-container">
                        <div
                            class="detail-list"
                            v-for="orderDetail in orderDetails"
                            :key="orderDetail.id"
                        >
                            <img :src="orderDetail.Product.image_url" />
                            <h5>
                                {{ orderDetail.qty }} x
                                {{ orderDetail.Product.name }}
                            </h5>
                            <span
                                v-if="
                                    orderDetail.status == 'Waiting confirmation'
                                "
                                v-on:click="deleteOrder(orderDetail.id)"
                                >Cancel</span
                            >
                            <span
                                v-if="orderDetail.status == 'On Process'"
                                v-on:click="finishOrder(orderDetail.id)"
                                >Done</span
                            >
                            <span
                                v-if="orderDetail.status == 'Finished'"
                                v-on:click="deleteOrder(orderDetail.id)"
                                >Finished</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import axios from 'axios';
import OrderCard from '../components/OrderCard.vue';
import Swal from 'sweetalert2';

export default {
    name: 'Order',
    components: {
        OrderCard
    },
    data() {
        return {
            orders: [],
            orderDetailModal: false,
            orderDetails: [],
            selectedOrderCOde: ''
        };
    },
    methods: {
        getAllOrder: function() {
            axios({
                method: 'get',
                url: `${this.$store.state.rootUrl}/order`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    this.orders = result.data;
                })
                .catch(err => {
                    this.$store.dispatch('errorHandler', err.response);
                });
        },
        closeOrderDetailModal: function() {
            this.orderDetailModal = false;
        },
        openOrderDetailModal: function(payload) {
            this.selectedOrderCOde = payload[0].code;
            this.orderDetails = payload;
            this.orderDetailModal = true;
        },
        deleteOrder: function(order_id) {
            Swal.fire({
                title: 'Delete this order?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                if (result.value) {
                    axios({
                        method: 'delete',
                        url: `${this.$store.state.rootUrl}/order/${order_id}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                        .then(result => {
                            let newOrder = [];
                            this.orderDetails.forEach(element => {
                                if (element.id != order_id) {
                                    newOrder.push(element);
                                }
                            });
                            Swal.fire(
                                'Deleted!',
                                'Your order has been canceled.',
                                'success'
                            );
                            this.getAllOrder();
                            this.orderDetails = newOrder;
                        })
                        .catch(err => {
                            this.$store.dispatch('errorHandler', err.response);
                        });
                }
            });
        },
        finishOrder: function(order_id) {
            Swal.fire({
                title: 'Finish this order?',
                text: 'Hereby you confirm your order has arrived',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(result => {
                if (result.value) {
                    axios({
                        method: 'patch',
                        url: `${this.$store.state.rootUrl}/order/finishOrder/${order_id}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                        .then(result => {
                            return axios({
                                method: 'get',
                                url: `${this.$store.state.rootUrl}/order/${this.selectedOrderCOde}`,
                                headers: {
                                    access_token: localStorage.getItem(
                                        'access_token'
                                    )
                                }
                            });
                        })
                        .then(result => {
                            this.orderDetails = result.data;
                            Swal.fire(
                                'Done!',
                                'Thank you for shopping at Toko Gunpla.',
                                'success'
                            );
                            this.getAllOrder();
                        })
                        .catch(err => {
                            this.$store.dispatch('errorHandler', err.response);
                        });
                }
            });
        }
    },
    created() {
        this.getAllOrder();
    }
};
</script>
