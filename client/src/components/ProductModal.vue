<template>
	<b-modal id="ProductModal" ref="ProductModal" hide-header hide-footer>
        <div class="form-group row mb-0">
            <div class="col-6 col-sm-6 image-preview">
                <img id="image_preview" :src="image_url" class="img-thumbnail">
            </div>
            <div class="col-6 col-sm-6 d-flex flex-column justify-content-between">
                <h2>{{ name }}</h2>
                <h5>IDR {{ priceMark }}</h5>
                <h5 v-if="stock">{{ stock }} left in stock</h5>
                <h5 v-if="!stock">OUT OF STOCK</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <form id="ProductDetail" @submit.prevent="">
                    <div class="form-group row mb-0">
                        <div class="col-12 d-flex flex-row justify-content-between" style="position: relative; bottom: 0px;">
                                <button
                                    type="button"
                                    class="btn btn-outline-secondary"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Cancel"
                                    @click.prevent="hideModal()"
                                >
                                    ↰
                                </button>
                                <b-form-spinbutton
                                    style="width: 120px"
                                    type="number"
                                    min="1"
                                    :max="100"
                                    step="1"
                                    v-model="quantity"
                                ></b-form-spinbutton>
                                <button
                                    type="submit"
                                    class="btn btn-outline-success"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Add to Cart"
                                    @click.prevent="triggerAddToCart()"
                                    v-if="path === '/'"
                                >
                                    &#10010;
                                </button>
                                <button
                                    type="submit"
                                    class="btn btn-outline-warning"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Change Qty"
                                    @click.prevent="triggerEditCart()"
                                    v-if="path === '/cart'"
                                >
                                    🖉
                                </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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
            price: 0,
            stock: 0,
            quantity: 1,
            cartId: null
        }
    },
    computed: {
        ...mapState(['productDetail','cartDetail']),
        priceMark() {
            return this.price.toLocaleString()
        },
        path() {
            return this.$route.path
        }
    },
    methods: {
        ...mapActions(['addToCart','editCart']),
        hideModal() {
            this.clearForm()
            this.$refs.ProductModal.hide()
            // this.$store.commit('modalReset')
        },
        clearForm() {
            this.id = null
            this.name = ''
            this.image_url = ''
            this.price = 0
            this.stock = 0
            this.quantity = 1
            this.cartId = null
        },
        triggerAddToCart() {
            let newItem = {
                id: this.id,
                quantity: this.quantity,
            }
            this.addToCart(newItem)
            this.hideModal()
        },
        triggerEditCart() {
            Swal.fire({
                title: 'Edit this?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                })
                .then((result) => {
                if (result.value) {
                    let editItem = {
                        id: this.cartId,
                        quantity: this.quantity
                    }
                    this.editCart(editItem)
                    this.hideModal()
                }
            })
        }
    },
    watch: {
        productDetail() {
            this.id = this.productDetail.id
            this.name = this.productDetail.name
            this.image_url = this.productDetail.image_url
            this.price = this.productDetail.price
            this.stock = this.productDetail.stock
        },
        cartDetail() {
            this.id = this.cartDetail.Product.id
            this.name = this.cartDetail.Product.name
            this.image_url = this.cartDetail.Product.image_url
            this.price = this.cartDetail.Product.price
            this.stock = this.cartDetail.Product.stock
            this.quantity = this.cartDetail.quantity
            this.cartId = this.cartDetail.id
        }
    }
}
</script>

<style>
* {
    font-family: 'Share Tech', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

</style>