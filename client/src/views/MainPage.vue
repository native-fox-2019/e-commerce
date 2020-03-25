<template>
    <div>
        <div class="product-container">
            <h4>Available Product</h4>
            <div class="product-list">
                <div
                    class="product-flex"
                    v-for="product in $store.state.products"
                    v-bind:key="product.id"
                >
                    <ProductCard v-bind:product="product"></ProductCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductCard from '../components/ProductCard.vue';
export default {
    name: 'MainPage',
    components: {
        ProductCard
    },
    data() {
        return {};
    },
    created() {
        this.$store.dispatch('getAllProduct');
    }
};
</script>
