<template>
    <b-card 
    :title="product.name" 
    :img-src="$store.state.IMG_SERVER+product.image_url" img-alt="Image" class="mb-4 col-sm-3 ml-5">

        <b-card-text>
            {{product.description}}
        </b-card-text>

        <router-link :to="'/product-detail/'+product.id">
            <b-button variant="primary">Product detail</b-button>
        </router-link>
    </b-card>
</template>
<script>
export default {
    props:['product']
}
</script>