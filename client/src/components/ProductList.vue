<template>
	<div class="d-flex flex-column ">
		<div class="w-100 d-flex flex-column justify-content-center shadow-sm" style="height: 10%;">
			<h2>Shopping Cart</h2>
		</div>
		<b-table sticky-header responsive class="w-100" style="" :fields="fields" :items="checkoutList">
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
					@click.prevent="triggerEditForm(data.item.id)"
					v-b-modal.ProductFormModal
				>🖉</b-button>
				<b-button
                    variant="outline-danger"
                    class="m-1"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Remove from Cart"
                    @click.prevent="triggerDelete(data.item.id)"
                >✘</b-button>
			</template>
		</b-table>
		<div class="w-100 d-flex flex-row justify-content-between shadow-lg" style="height: 10%; position: relative; bottom: 0; left: 0; right: 0;"></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
		this.$store.dispatch("shoppingCart");
	},
	computed: mapGetters(["checkoutList"]),
	methods: {
		...mapActions(["productFind"]),
		triggerEditForm(id) {
			this.productFind(id);
		},
		triggerDelete(id) {
			Swal.fire({
				title: "Delete this?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33"
			}).then(result => {
				if (result.value) {
					this.productDelete(id);
				}
			});
        },
        subtotal(value) {
            return (value.price * value.ShoppingCart.quantity).toLocaleString()
        }
	}
};
</script>