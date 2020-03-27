<template>
  <div style="margin-top: 60px">
    <div class="row mx-5 pt-2">
      <b-card class="col-7">
        <router-link to="/" class="m-2">
          <b-button variant="info">
            Back
          </b-button>
        </router-link>
        <b-card class="mt-2 text-center">
          <img :src="productDetail.image_url" alt="" srcset="" width="400vw">
        </b-card>
      </b-card>
      <b-card class="col-5 p-2">
        <b-card>
          <h1 class="text-center">{{productDetail.name}}</h1>
          <div>
            <p class="text-justify">
            {{productDetail.description}}
            </p>
            <h2>
              {{new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 3
              }).format(productDetail.price)}}
            </h2>
            <em>
              Stock: {{productDetail.stock}}
            </em>
          </div>
        </b-card>
        <b-card>
          <div>
            <div class="d-flex justify-content-center">
              <div v-if="productDetail.stock>0">
                <b-button variant="primary" disabled v-if="spinner">
                  <b-spinner small type="grow"></b-spinner>
                  Loading...
                </b-button>
                <b-button type="button" variant="success" @click.prevent="addToCart(productDetail)" v-else>Add to Cart</b-button>
              </div>
              <b-button type="button" variant="warning" v-else>Out of stock</b-button>
            </div>
          </div>
        </b-card>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailProduct",
  data(){
    return {
      spinner: false,
      productDetail: {},
    }
  },
  methods: {
    getProduct(id){
      this.spinner = true
      this.$axios({
        url: "/products/"+id,
        method: "get"
      })
      .then(({data})=>{
        this.spinner = false
        this.productDetail = data
      })
      .catch(({response})=>{
        this.spinner = false
        console.log(response)
      })
    },
    addToCart(productDetail){
      if (this.$store.state.isLogin) {
      this.spinner = true
      this.$axios({
        url: '/carts',
        method: 'post',
        headers:{
          token: localStorage.getItem("token")
        },
        data: {
          ProductId: productDetail.id
        }
      })
      .then(({data})=>{
        this.$store.dispatch("getCart")
        this.spinner = false
        this.$swal.fire({
          icon: 'success',
          html: `Product successfully add to cart`,
        })
        console.log(data)
      })
      .catch(({response})=>{
        this.spinner = false
        if (localStorage.getItem("token")) {
          this.$swal.fire({
            icon: 'error',
            html: response.data.message,
          })
        } else {
          this.$swal.fire({
            icon: 'error',
            text: 'You Must Login First',
          })
        }
        console.log(response.data)
      })
      }else{
        this.$swal.fire({
            icon: 'error',
            text: 'You Must Login First',
          })
      }
    }
  },
  created(){
    this.getProduct(this.$route.params.id)
    // console.log(this.$route.params.id)
  }
}
</script>

<style>

</style>