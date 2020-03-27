<template>
	<div class="d-flex flex-column ">
		<div class="w-100 d-flex flex-column justify-content-center shadow-sm" style="height: 56px;">
			<h2 class="m-auto">Shopping Cart</h2>
		</div>
		<b-table v-if="checkoutList.length" sticky-header="540px" responsive class="w-100 mb-0" style="overflow-y: scroll;" :fields="fields" :items="checkoutList">
			<template v-slot:cell(image_url)="data">
				<img :src="data.value" class="img-thumbnail" />
                <p class="my-2">{{ data.item.name }}</p>
			</template>

            <template v-slot:cell(subtotal)="data">
                <p class="my-2">IDR {{ subtotal(data.item) }}</p>
			</template>

			<template v-slot:cell(options)="data">
				<b-button
					variant="outline-warning"
					class="m-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Change Qty"
					@click.prevent="triggerFindCart(data.item.ShoppingCart.id)"
					v-b-modal.ProductModal
				>🖉</b-button>
				<b-button
                    variant="outline-danger"
                    class="m-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Remove from Cart"
                    @click.prevent="triggerDeleteCart(data.item.ShoppingCart.id)"
                >✘</b-button>
			</template>
		</b-table>
		<div v-if="checkoutList.length" class="w-100 d-flex flex-row justify-content-end shadow-lg" style="height: 56px; position: relative; bottom: 0; left: 0; right: 0;">
			<div style="height: 100%;">
				<h3 class="text-right" style="line-height: 56px;">
					Total: IDR {{ total }}
				</h3>
			</div>
			<div style="width: 164px;" class="d-flex justify-content-center">
				<b-button
                    variant="primary"
                    class="my-auto"
                    @click.prevent="triggerCheckout()"
                >Checkout</b-button>
			</div>
        </div>
		<div v-if="!checkoutList.length" class="d-flex flex-column justify-content-center align-items-center w-100 h-100">
			<p>
				There's nothing here yet.
				<br>
				Why don't we change that, shall wee?
			</p>
			<b-button variant="primary">Browse Our Products</b-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
	name: "ProductList",
	data() {
		return {
			fields: [
				{
					key: "image_url",
					label: "Product",
					thStyle: { width: "120px" }
                },
                {
					key: "price",
					label: "Unit Price",
					formatter: value =>
						'IDR ' + value.toLocaleString()
                },
                {
                    key: "ShoppingCart.quantity",
					label: "Qty",
					formatter: value =>
						'x ' + value
				},
                "subtotal",
                {
					key: "options",
					thStyle: { width: "150px" }
                },
			]
		};
	},
	created() {
        this.$store.dispatch("shoppingCart")
	},
    computed: {
        ...mapGetters(["checkoutList","total"])
    },
	methods: {
		triggerFindCart(id) {
            this.$store.dispatch('findCart', id)
		},
		triggerDeleteCart(id) {
			Swal.fire({
				title: "Delete this?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33"
			}).then(result => {
				if (result.value) {
					this.$store.dispatch('deleteCart', id)
				}
			});
		},
		triggerCheckout() {
			Swal.fire({
				title: "Checkout Now?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33"
			}).then(result => {
				if (result.value) {
					this.$store.dispatch('checkout')
				}
			});
		},
        subtotal(value) {
            return (value.price * value.ShoppingCart.quantity).toLocaleString()
        }
	}
};
</script>