<template>
    <div>
        <h1>Oldie Music</h1>
        <p>Your vintage guitar seller</p>
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2">
                <div v-for="data in dataProducts" :key="data.index" class="col mb-4 w-75 h-50">
                    <ProductCard :data="data"></ProductCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductCard from '../components/ProductCard.vue'
import { mapState } from 'vuex'

export default {
    components: {
        ProductCard
    },
    created(){
        this.$store.dispatch('getProduct')
    },
    computed: mapState([
        'dataProducts'
    ])
}
</script>