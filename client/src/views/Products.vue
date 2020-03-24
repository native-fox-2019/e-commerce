<template>
  <div class="container" style="margin-top:100px;">
    <div class="row">
      <div class="col-3" v-for="product in this.$store.state.productList" :key="product.id">
        <div class="card mb-4">
          <img class="card-img-top" :src="product.image_url" alt="Card image cap" style="width:100%; height:210px;"/>
          <div class="card-body">
            <p class="card-text" style="font-size:15px;">
                {{ product.name }}
            </p>
            <p class="card-text" style="font-size:15px;">
                {{ product.showPrice }}
            </p>
            <label for="">Amount: </label>
            <input type="number" min="0" :max="product.stock" placeholder="0" v-model="amount[Number(product.id)]" style="width:30px;"><br>
            <button class="btn btn-outline-danger btn-sm" @click.prevent="addToCart(product.id, product.price, amount)">add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getProduct");
  },
  data() {
      return {
          amount: {

          },
          totals:'' ,
          ids:'',
          amounts:''
      }
  },
  methods: {
      addToCart(id, price, amount) {
          let total = price*amount[id]
          this.totals = total
          this.ids = id
          this.amounts = Number(amount[id])
          console.log(this.amounts, this.totals)
          this.$store.dispatch('addToCart',{
              product_id: this.ids,
              amount: this.amounts,
              total: this.totals
          })
          this.empty()
      },
      empty() {
          this.amount = {}
          this.totals = ''
          this.ids = ''
          this.amounts = ''
      }
  }
};
</script>

<style></style>
