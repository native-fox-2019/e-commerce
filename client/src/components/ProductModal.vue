<template>
	<b-modal id="ProductModalModal" ref="ProductModalModal" title="Product Form" hide-header hide-footer>
        <div class="form-group row">
            <div class="col-sm-12">
                <div class="h4">{{ id ? 'Edit' : 'Add' }} Product</div>
            </div>
        </div>
		<form id="ProductModal" @submit.prevent="">
			<div class="form-group row">
				<label for="name" class="col-sm-3 col-form-label">Name</label>
				<div class="col-sm-9">
					<input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="name"
                    />
				</div>
			</div>
			<div class="form-group row">
				<label for="image_url" class="col-sm-3 col-form-label">Image URL</label>
				<div class="col-sm-9">
					<input
						type="text"
						class="form-control"
						id="image_url"
						v-model="image_url"
					/>
				</div>
			</div>
            <div class="form-group row">
				<label for="image_preview" class="col-sm-3 col-form-label">Image View</label>
                <div class="col-sm-9 d-flex flex-row justify-content-center">
                    <img id="image_preview" :src="image_url" class="img-thumbnail">
                </div>
			</div>
            <div class="form-group row">
				<label for="price" class="col-sm-3 col-form-label">Price</label>
				<div class="col-sm-9">
					<b-form-spinbutton
						type="number"
                        min="1000"
						class="form-control"
						id="price"
                        max="10000000"
                        step="1000"
						v-model="price"
					></b-form-spinbutton>
				</div>
			</div>
            <div class="form-group row">
				<label for="stock" class="col-sm-3 col-form-label">stock</label>
				<div class="col-sm-9">
					<b-form-spinbutton
						type="number"
                        min="1"
						class="form-control"
						id="stock"
                        max="1000"
                        step="1"
						v-model="stock"
					></b-form-spinbutton>
				</div>
			</div>
            <div class="form-group row mt-5 mb-0">
                <div class="col-sm-12">
                    <button
                        v-if="!id"
                        type="submit"
                        class="btn btn-outline-success float-right mr-2"
                        @click.prevent="triggerAdd()"
                    >
                        &#10010;
                    </button>
                    <button
                        type="button"
                        class="btn btn-outline-secondary float-right"
                        @click.prevent="hideModal()"
                    >
                        ↰
                    </button>
                </div>
            </div>
		</form>
	</b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: "ProductModal",
    data() {
        return {
            id: null,
            name: '',
            image_url: '',
            price: null,
            stock: null
        }
    },
    computed: mapState(['productDetail']),
    methods: {
        ...mapActions(['productAdd','productEdit','productDelete']),
        hideModal() {
            this.clearForm()
            this.$refs.ProductModalModal.hide()
        },
        clearForm() {
            this.id = null,
            this.name = '',
            this.image_url = '',
            this.price = null,
            this.stock = null
        },
        triggerAdd() {
            let newProduct = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
            this.productAdd(newProduct)
            this.hideModal()
        },
        triggerEdit() {
            Swal.fire({
                title: 'Edit this?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    let productId = this.id
                    let updateProduct = {
                        name: this.name,
                        image_url: this.image_url,
                        price: this.price,
                        stock: this.stock
                    }
                    this.productEdit({ updateProduct, productId })
                    this.hideModal()
                }
            })
        },
        triggerDelete() {
            Swal.fire({
                title: 'Delete this?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    this.productDelete(this.id)
                    this.hideModal()
                }
            })
        }
    },
    watch: {
        productDetail() {
                this.id = this.productDetail.id;
                this.name = this.productDetail.name;
                this.image_url = this.productDetail.image_url;
                this.price = this.productDetail.price;
                this.stock = this.productDetail.stock;
        }
    }
};
</script>