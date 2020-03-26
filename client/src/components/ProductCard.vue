<template>
    <div>
        <div class="product">
            <div class="product-content">
                <img v-bind:src="product.image_url" />
                <div class="description">
                    <p class="p-name">{{ product.name }}</p>
                    <p class="p-stock">Stock: {{ product.stock }}</p>
                    <p class="p-stock">Price: {{ product.price }} IDR</p>
                    <div class="action">
                        <span v-on:click="pushDetail(product)">detail product</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
    name: "ProductCard",
    props: ["product"],
    data() {
        return {};
    },
    methods: {
        pushDetail: function(product) {
            if (!localStorage.getItem("access_token")) {
                Swal.fire({
                    title: "Sign In Required.",
                    text: "To see the product detail, you need to sign in.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Go to Login Page"
                }).then(result => {
                    if (result.value) {
                        this.$store.state.product_temp = product;
                        this.$router.push({
                            name: "ProductDetail",
                            params: { id: product.id }
                        });
                    }
                });
            } else {
                this.$store.state.product_temp = product;
                this.$router.push({
                    name: "ProductDetail",
                    params: { id: product.id }
                });
            }
        }
    }
};
</script>
