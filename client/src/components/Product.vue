<template>
  <div class="col-3">
    <b-card
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="my-2 shadow p-2 bg-white rounded"
      
    >
    <router-link :to="`/product/${product.id}`">
    <b-card-img :src="product.image_url">
    </b-card-img>
    <b-card-title>{{product.name}}</b-card-title>
    </router-link>
      <b-card-text>
        <em class="text-shadow">
          {{new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumSignificantDigits: 3
          }).format(product.price)}}
        </em>
      </b-card-text>

      <b-button href="#" variant="success" @click.prevent="addToCart(product)">Add to Cart</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Product",
  data(){
    return{
      pic: 0,
    }
  },
  props:["product"],
  methods: {
    addToCart(product){
      this.$axios({
        url: '/carts',
        method: 'post',
        headers:{
          token: localStorage.getItem("token")
        },
        data: {
          ProductId: product.id
        }
      })
      .then(({data})=>{
        this.$store.dispatch("getCart")
        this.$swal.fire({
          icon: 'success',
          html: `Product successfully add to cart`,
        })
        console.log(data)
      })
      .catch(({response})=>{
          this.$swal.fire({
            icon: 'error',
            text: 'You Must Login First',
          })
        console.log(response.data)
      })
    }
  },
}
</script>

<style scoped>
</style>>

</style>