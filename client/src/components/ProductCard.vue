<template>
    <div class="card shadow mb-4 mx-2" style="width: 12rem;">
        <img :src="product.image_url" class="card-img-top" style="width: 12rem; height: 12rem;">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">IDR {{ product.price.toLocaleString() }}</p>
            <button class="btn btn-primary btn-block" @click.prevent="triggerFindProduct()" v-b-modal.ProductModal>Details</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['product'],
    methods: {
        triggerFindProduct() {
            this.$store.dispatch('productFind', this.product.id)
        }
    }
}
</script>