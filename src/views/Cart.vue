<template>
    <div class="cart">
        <div class="container">
            <h2 class="my-4">Cart</h2>
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in cart" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price.toLocaleString() }}</td>
                        <td>1</td>
                        <td>{{ product.price.toLocaleString() }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">TOTAL</td>
                        <td>{{ total.toLocaleString() }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cart",
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        total() {
            let total = 0;
            for (const product of this.$store.state.cart) {
                total += product.price;
            }
            return total;
        }
    }
}
</script>