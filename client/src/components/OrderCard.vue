<template>
    <div class="order-card" v-on:click="getOrderDetail(order.order_code)">
        <h4>{{ order.order_code }}</h4>
        <p>Order date: {{ formatDate }}</p>
        <p>Order time: {{ formatTime }}</p>
        <p>Order {{ order.total_product }} product(s)</p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'OrderCard',
    props: ['order'],
    data() {
        return {};
    },
    methods: {
        getOrderDetail: function(order_code) {
            axios({
                method: 'get',
                url: `${this.$store.state.rootUrl}/order/${order_code}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    this.$emit('openOrderDetailModal', result.data);
                })
                .catch(err => {
                    this.$store.dispatch('errorHandler', err.response);
                });
        }
    },
    computed: {
        formatDate: function() {
            let date = new Date(this.order.order_date);
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

            return `${
                dayName[date.getDay()]
            }, ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
        formatTime: function() {
            let date = new Date(this.order.order_date);

            return `${date.getHours()}:${date.getMinutes()}`;
        }
    }
};
</script>
